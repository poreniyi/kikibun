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
    for(let i=0; i<tokens.length; i++){
        let singleToken=tokens[i];
        let afterPart=singleToken.conjugatedParts;
        let beforePart=singleToken.before;
        let base=singleToken.base;
        singleToken.statusKnown= await Genki.findOne({Kanji:base,Chapter:{$lte:chapter}})? true:  await Genki.findOne({Chapter:{$lte:chapter},Hiragana:base, Kanji:"none"})?true :false;
        if(singleToken.statusKnown){
          //  singleToken.Chapter=await  Genki.findOne({Kanji:base}).select(' -_id Chapter'));
            //singleToken.Chapter= await Genki.findOne({Kanji:base}).Chapter;
            let word=(await Genki.findOne({Kanji:base}) ||await Genki.findOne({Hiragana:base}));
            singleToken.Chapter=word.Chapter;
            singleToken.addDescription(word.English);
        }
        findParticles(afterPart,chapter);
        findParticles(beforePart,chapter);
       
    }
    return tokens;
}
let findParticles=async(array,chapter)=>{
    for(let j=0 ; j<array.length; j++){
        let element=array[j];
        let text=array[j].text;
        console.log(`The text of the element is ${text}`);
        let data=await Particles.findOne({Form:text,Chapter:{$lte:chapter}}) ? true: false;
        if(data){
            let particle=await Particles.findOne({Form:text});
            element.makeKnown();
            element.updateDescription(particle.Name);
            element.updateChapter(particle.Chapter);
        }
    } 
 }

module.exports={
    Chapter1:Chapter1,
    Chapter1Update,Chapter1Update,
    GenkiParser:GenkiParser,
};