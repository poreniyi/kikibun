const express=require('express');
const router=express.Router();
const N5=require("../databaseApp/dataApp");
path = require('path')
const Parser=require('../Parser/GenkiParser');
const database=require("../databaseApp/dataApp");
const Genki=database.Genki;
const JLPT=database.JLPT;

router.get('/',function(req,res){
    //res.sendFile(__dirname , "../HtmlFiles/index.html");
    res.sendFile(path.join(__dirname, '..', 'HtmlFiles', 'index.html'));
});
router.post('/results.html',async(req,res)=>{
        try{
            let text=req.body.text;
            console.log(req.body);
            let result = await Parser.Chapter1(req.body.text.trim());
            console.log("MY RESULT IS:" +result);
            res.render('results',{ data: result, originalSentence:text});
        }
        catch(error){
            console.log(error);
        }
});


myfunction= async (string)=>{
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



 
makeGenkiVocabRoutes= ()=>{
    for(let i=1;i<23;i++){
        let paths="/Chapter:";
        paths+=i;
        router.get(paths, async(req, res)=>{
        let data= await Genki.find({});
        res.render('chapterViews',{words:data});
        }); 
        router.post(paths,(req,res)=>{
            console.log(req.body);
            res.send("Results Sent");
            });
    }
}


makeGenkiVocabRoutes();

module.exports=router;