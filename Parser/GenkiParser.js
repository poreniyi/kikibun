let Genki=require('../databaseApp/dataApp').Genki;
let Particles=require('../databaseApp/dataApp').Particles;
let JLPT=require('../databaseApp/dataApp').JLPT;

let dbScripts=require('../databaseApp/databaseScripts');
let tokenizer=require('../kuromojinParser/Tokenizer');

GenkiParser=async (tokens,chapter,nLVL)=>{
    let wordKnownCounter=0;
    let wordStats={};
    let totalWords=tokens.length;

    for(let i=0; i<tokens.length; i++){
        if (tokens[i].EnPOS=='Symbol'){
            //console.log(`Symbol so skipped`);
            totalWords--;
            continue;
        }
        let singleToken=tokens[i];
        let afterPart=singleToken.conjugatedParts;
        let beforePart=singleToken.before;
        let base=singleToken.base;
        await findParticles(afterPart,chapter,nLVL,singleToken,'Form');
        await findParticles(beforePart,chapter,nLVL,singleToken,'Before');   
        let word= await 
        Genki.findOne({$or:[
            {Kanji:base,Chapter:{$lte:chapter}},
            {Chapter:{$lte:chapter},Hiragana:base, Kanji:"none"}
        ]}).select('Chapter English').lean();
        if(word){
            singleToken.statusKnown=true;
            wordKnownCounter++;
            singleToken.Chapter=word.Chapter;
            singleToken.addDescription(word.English);
        }
        if(nLVL!=0){
            let jlptWord= await JLPT.findOne({$or:[
                {Kanji:base,nLevel:{$gte:nLVL}},
                {nLevel:{$gte:nLVL},Hiragana:base, Kanji:"None"}
            ]}).select('nLevel English').lean();
            if(jlptWord){
                singleToken.JLPTLvl=jlptWord.nLevel;
                if(!singleToken.statusKnown){
                    singleToken.statusKnown=true;
                    wordKnownCounter++;
                    singleToken.addDescription(jlptWord.English);
                }
            }
        }
       
    }
    
    wordStats.total=totalWords;
    wordStats.known=wordKnownCounter;

    console.log(`The total amount of words known is${tokens.length} The amount of words known is:${wordKnownCounter}`);
    return {tokens:tokens,
            stats:wordStats,
        };
}
let findParticles=async(array,chapter,nLVL,word,position)=>{
    for(let j=0 ; j<array.length; j++){
        let element=array[j];
        let text=array[j].text;
        let pos=word.EnPOS.toLowerCase();
        let test='Chapter';
        if(chapter>0){
            let genkiData=await Particles.findOne({
                [position]:text,Chapter:{$lte:chapter},POSActedOn:{$in:[pos,'All']}
                 }).select('Name Chapter').lean();
            if(genkiData){
                element.makeKnown();
                element.updateDescription(genkiData.Name);
                element.updateChapter(genkiData.Chapter);
                word.updateNumberBeforeKnown();
            }
        }
       if(nLVL>0){
        let jlptData=await Particles.findOne({
            [position]:text,NLvl:{$gte:nLVL},POSActedOn:{$in:[pos,'All']}
        }).select('Name NLvl').lean();
        if(jlptData){
            element.JLPTLvl=jlptData.NLvl;
            if(element.status=='unknown'){
                element.makeKnown();
                element.updateDescription(jlptData.Name);
                word.updateNumberBeforeKnown();
            }
        }
       }
    } 
 }

module.exports={
    GenkiParser:GenkiParser,
};