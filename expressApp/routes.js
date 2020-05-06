const express=require('express');
const router=express.Router();
const N5=require("../databaseApp/dataApp");
path = require('path')
const Parser=require('../Parser/GenkiParser');
const database=require("../databaseApp/dataApp");
const Genki=database.Genki;
const JLPT=database.JLPT;

router.get('/',function(req,res){
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

router.get("/GenkiVocabList",async(req,res)=>{
    let data= await Genki.find({});
    console.log(req.query);
    res.render('chapterViews',{
        chapter:req.query.chapter,
        words:data});
});

router.post("/GenkiVocabList", (req,res)=>{
    console.log(req.body.hasBeenChanged);
    res.send("Results Sent");
});


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