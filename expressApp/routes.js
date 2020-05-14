const express=require('express');
const router=express.Router();
const N5=require("../databaseApp/dataApp");
path = require('path')
const Parser=require('../Parser/GenkiParser');
const database=require("../databaseApp/dataApp");
const Genki=database.Genki;
const JLPT=database.JLPT;
let dbScripts=require('../databaseApp/databaseScripts');
const unqieValidator=require('mongoose-unique-validator');

router.get('/About',function(req,res){
    res.render("About");
});
router.get('/',function(req,res){
    res.render("Home");
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
    let data;
    let page = parseInt(req.query.page)
    if(!page){
        console.log("NO page");
       data=await Genki.find({Chapter:chapter});  
    }else if(chapter<24 && chapter>0 &&page>0){
        let size = await Genki.estimatedDocumentCount({Chapter:chapter})
        console.log(`The collection size is ${size}`);
        let max=pageSize*Math.floor(size/pageSize)+1;
        let overflow= size-max
                console.log(`max is ${max}`);
        let totalDocs=pageSize*page;
        if(totalDocs>size&& page==max){
           // console.log(`page is ${req.query.page}`)
             data= await Genki.find({Chapter:chapter}).limit(overflow).skip(max);          
        }else if(page>0 &&page<max){
            console.log(`Max is:${max} and page is: ${page}`)
            let skipAmount=(page-1)*20;
             data= await Genki.find({Chapter:chapter}).limit(pageSize).skip(skipAmount);
        }
    } 
    if( data){
        res.render('chapterViews',{
            chapter:req.query.chapter,
            words:data});
    }
    else{
        res.status(404).sendFile(path.join(__dirname, '..', 'HtmlFiles', '404.html'));
    }   
});

router.post("/GenkiVocabList", (req,res)=>{
    let objList=[]
    let posList=[];
    if(typeof req.body.POS!='object'){
        posList.push(String(req.body.POS));
        console.log(posList[0]);
        console.log(req.body.Id);
        objList.push({
            POS:String(req.body.POS),
            id:req.body.Id,
            } 
        );
    }else{
         posList=[...req.body.POS];
         for(let i=0;i<posList.length;i++){
            if(posList[i]!=""){
             objList.push({
                 POS:posList[i],
                 id:req.body.Id[i],
             });
            }
         }
    }  
    console.log(`Length of request POS is : ${posList.length}`);
    objList.forEach(element=>{
        let i=1;
        console.log(`Object List element${i}: ${element.POS} and ${element.id}`);
        i++;
        dbScripts.updateThis(element.id,"POS",element.POS);
    })
    console.log(`The length is:${objList.length} `);
    res.redirect('back');
    //res.send("Results Sent");
});



module.exports=router;