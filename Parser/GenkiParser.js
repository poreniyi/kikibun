let Genki=require('../databaseApp/dataApp').Genki;
let Particles=require('../databaseApp/dataApp').Particles;
let JLPT=require('../databaseApp/dataApp').JLPT;

let dbScripts=require('../databaseApp/databaseScripts');
const particleFound=dbScripts.particleExists;
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
        let data=await Particles.findOne({
            [position]:text,Chapter:{$lte:chapter},POSActedOn:{$in:[pos,'All']}
             }).select('Name Chapter').lean();
        if(data){
            element.makeKnown();
            element.updateDescription(data.Name);
            element.updateChapter(data.Chapter);
            word.updateNumberBeforeKnown();
            //console.log(`Success ${text} has been found of ${counter.base}`);
           // console.log(`The counter is now:${counter}`);
        }else{
            //console.log(`Failure!! ${text} not found of ${counter.base} `)
        }
    } 
 }

module.exports={
    GenkiParser:GenkiParser,
};