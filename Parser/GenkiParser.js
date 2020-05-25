let Genki=require('../databaseApp/dataApp').Genki;
let dbScripts=require('../databaseApp/databaseScripts');
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
   


module.exports={
    Chapter1:Chapter1,
    Chapter1Update,Chapter1Update,
};