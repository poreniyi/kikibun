const express=require('express');
const router=express.Router();
const N5=require("./dataApp");
const database=require("./dataApp");
const Genki=database.Genki;
const JLPT=database.JLPT;

router.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});
router.get('/results',function(req,res){
    res.sendFile(__dirname + "/results.html")
});

router.get("/r",function(req, res){
    res.render('results');
});
router.post('/results.html',async(req,res)=>{
        try{
            let result = await myfunction(req.body.text);
            console.log("MY RESULT IS:" +result);
            //result=[1,2,3];
            res.render('results',{ data: result});
        }
        catch(error){
            console.log(error);
        }
        
});
for(let i =1;i<6;i++){
    let path="/N";
    path+=i
    router.get(path,function(req,res){
        let view= path.substring(1);
       JLPT.findOne({}).then(function(words){
            res.render(view,{data:words});
        });
    });
};

myfunction=  (string)=>{
    let wordArray=[];
    let index=0;
    const regex = /.+は.+です/gm;
    if (regex.test(string)){
        let result=[]
        console.log("passed test");
       let split=string.split('は');
        split[0]=split[0];
        split[1]=split[1].slice(0,-2);
        split.forEach( element=>{
            Genki.find({Kanji:element}).then(function(words){
                result[index]=words.toJSON();
                index++;
               words.forEach( value=>{              
                   wordArray.push(value.toJSON());
                   console.log("Length of word array is: "+wordArray.length)
                   console.log("This is the index array"+result);
               });
           });
       });   
    }
   console.log("This is the word array:"+wordArray+"length"+wordArray.length);
    //return [1,2,3];
   // result=[...wordArray];
   result=wordArray.slice();

    console.log(result);
    return result;
    return wordArray;
};
module.exports=router;
