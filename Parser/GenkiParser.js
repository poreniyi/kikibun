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
       // console.log(`The element is ${singleToken} the before is ${beforePart} and the after is ${afterPart}`);
        if (beforePart.length!=0){
           if(beforePart.every(async element=>{
               // return await particleFound(element,chapter);
           })){
               console.log(beforePart);
                //singleToken.MakeGrammarUnknown();
           }
        }
       for(let j=0 ; j<afterPart.length; j++){
           let element=afterPart[j];
           let text=afterPart[j].text;
           console.log(`The text of the element is ${text}`);
           if(await particleFound(text,chapter)==true){
               element.makeKnown();
           }
       }
       
    }
    return tokens;
}

module.exports={
    Chapter1:Chapter1,
    Chapter1Update,Chapter1Update,
    GenkiParser:GenkiParser,
};