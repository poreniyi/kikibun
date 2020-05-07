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
    let chapter = parseInt(req.query.chapter);
    let pageSize = 20;
    let page = parseInt(req.query.page)
     if(chapter<24 && chapter>0 &&page>0){
        let size = await Genki.estimatedDocumentCount({Chapter:chapter})
        console.log(`The collection size is ${size}`);

        let max=pageSize*Math.floor(size/pageSize)+1;
        let overflow= size-max
                console.log(`max is ${max}`);
        let totalDocs=pageSize*page;
        let data;
        if(totalDocs>size&& page==max){
            console.log(`page is ${req.query.page}`)
             //data= await Genki.find({Chapter:chapter}).limit(overflow).skip(max);          
        }else if(page>0 &&page<max){
            console.log(`Max is:${max} and page is: ${page}`)
            let skipAmount=(page-1)*20;
             data= await Genki.find({Chapter:chapter}).limit(pageSize).skip(skipAmount);
        }
        if( data){
            res.render('chapterViews',{
                chapter:req.query.chapter,
                words:data});
        }
    }else{
        res.status(404).sendFile(path.join(__dirname, '..', 'HtmlFiles', '404.html'));
    }   
});

router.post("/GenkiVocabList", (req,res)=>{
    console.log(req.body.hasBeenChanged);
    
    res.send("Results Sent",{
        data:,
    });
});



module.exports=router;