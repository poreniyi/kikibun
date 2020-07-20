let Genki=require('../databaseApp/dataApp').Genki;
let Particles=require('../databaseApp/dataApp').Particles;

let dbScripts=require('../databaseApp/databaseScripts');
const particleFound=dbScripts.particleExists;
let tokenizer=require('../kuromojinParser/Tokenizer');

Chapter1= async (string)=>{
    let wordArray=[];
    let index=0;
    let result=[]
    const regex = /.+は.+です/gm;
    if (regex.test(string)){
        console.log("passed test");
       let split=string.split('は');
        split[0]=split[0];
        split[1]=split[1].slice(0,-2);
        const DB= await Genki.find({});
        const data=DB.filter((item)=>{
                return split.includes(item.Kanji);
        })
       return   data;
    }else{;
        return [];
    }
    
};

 Chapter1Update=async(string)=>{
   let results=await tokenizer.tokenize(string);
   results.forEach(async element => {
        element.status= await dbScripts.documentExists(element.text) ? "Known" :"Unknown"
        console.log(element.status);
   });
   //console.log(element.pos);
   return results;
 } 
   
GenkiParser=async (tokens,chapter)=>{
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
        await findParticles(afterPart,chapter,singleToken);
        await findParticles(beforePart,chapter,singleToken);   
        singleToken.statusKnown= await 
        Genki.findOne({$or:[
            {Kanji:base,Chapter:{$lte:chapter}},
            {Chapter:{$lte:chapter},Hiragana:base, Kanji:"none"}
        ]})? true: false;
        if(singleToken.statusKnown){
            wordKnownCounter++;
          //  singleToken.Chapter=await  Genki.findOne({Kanji:base}).select(' -_id Chapter'));
            //singleToken.Chapter= await Genki.findOne({Kanji:base}).Chapter;
            let word=await 
            Genki.findOne({$or:[
                {Kanji:base,Chapter:{$lte:chapter}},
                {Chapter:{$lte:chapter},Hiragana:base, Kanji:"none"}
            ]}).lean;
            singleToken.Chapter=word.Chapter;
            singleToken.addDescription(word.English);
        }
       
    }
   // let wordKnownPercentage=+(wordKnownCounter/tokens.length*100).toFixed(2);
    let wordKnownPercentage=wordKnownCounter;
    wordStats.total=totalWords;
    wordStats.known=wordKnownCounter;

    console.log(`The total amount of words known is${tokens.length} The amount of words known is:${wordKnownCounter}`);
    return {tokens:tokens,
            stats:wordStats,
        };
}
let findParticles=async(array,chapter,word)=>{
    for(let j=0 ; j<array.length; j++){
        let element=array[j];
        let text=array[j].text;
        let pos=word.EnPOS
       // let data=await Particles.findOne({Form:text,Chapter:{$lte:chapter}}) ? true: false;
        let data=await Particles.findOne({
            Form:text,Chapter:{$lte:chapter},POSActedOn:{$in:[pos,'All']}
             }).lean() ? true: false;

        if(data){
            let particle=await Particles.findOne({
                Form:text,Chapter:{$lte:chapter},POSActedOn:{$in:[pos,'All']}
                 }).lean();
            element.makeKnown();
            element.updateDescription(particle.Name);
            element.updateChapter(particle.Chapter);
            word.updateNumberBeforeKnown();
            //console.log(`Success ${text} has been found of ${counter.base}`);
           // console.log(`The counter is now:${counter}`);
        }else{
            //console.log(`Failure!! ${text} not found of ${counter.base} `)
        }
    } 
 }

module.exports={
    Chapter1:Chapter1,
    Chapter1Update,Chapter1Update,
    GenkiParser:GenkiParser,
};