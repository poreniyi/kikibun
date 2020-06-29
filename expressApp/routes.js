const express=require('express');
const router=express.Router();
const N5=require("../databaseApp/dataApp");
path = require('path')
const Parser=require('../Parser/GenkiParser');
const database=require("../databaseApp/dataApp");
const Genki=database.Genki;
const Particles=database.Particles;
const JLPT=database.JLPT;
let dbScripts=require('../databaseApp/databaseScripts');
const unqieValidator=require('mongoose-unique-validator');
const fs=require('fs');
let tokenizer=require('../kuromojinParser/Tokenizer');
const { grammarTokenizer } = require('../kuromojinParser/Tokenizer');
let tokenOne=tokenizer.tokenizeOne;
let tokenize2=tokenizer.tokenize2;
let vocabTokenizer=tokenizer.vocabTokenizer;
let UpdatedParser=Parser.GenkiParser;
const getArticleData=require('../WebScraping/Scrape').readArticles;

router.get('/About',function(req,res){
    res.render("About");
});
router.get('/',function(req,res){
    res.render("Home");
});
router.post('/results.html',async(req,res)=>{
    let text=req.body.text.trim();
    let sentences=text.split("。");
    console.log("Results page: \n");
    console.log(`The Genki Chapter is ${req.body.Genki} and the JLPT lvl is ${req.body.JLPT}`);
        try{
            for(let i =0;i<sentences.length;i++){
                sentences[i]=await grammarTokenizer(sentences[i]);
            }
            let results=await grammarTokenizer(text);
            let vocab = await vocabTokenizer(text);
            console.log(results);
            res.render('Results3',
            {   original:text,
                grammar:sentences,
                vocab:vocab,
                Chapter:req.body.Genki,
                NLVL:req.body.JLPT,
            });
        }catch(err){
            console.log(err);
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
        //let size = await Genki.estimatedDocumentCount({Chapter:chapter})
        let size = await Genki.countDocuments({Chapter:chapter});
     

        console.log(`Chapter ${chapter}: has:${size} words`);
        let max=pageSize*(Math.floor(size/pageSize));
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

router.get("/NHK",async  (req,res)=>{
   let articles= await getArticleData();
//    console.log(array);
res.render("NHK",{
    Selected:'none',
    articles:articles,
    pie:2
})
});
router.post('/NHK',async (req,res)=>{
    let articles= await getArticleData();
   let articleNumber=req.body.articleNumber;
   console.log(`Test input is ${articleNumber}`);
    res.render("NHK",{
        articles:articles,
        Selected:articleNumber,
    }
    );
})

router.get("/test", async (req,res)=>{
    string='毎日歩くよく話す時々食べる中国のほうが日本より静かな花大きいです食べます犬があります';

   // string='食べていました食べた';
    // string=('犬があります家がありました');
    // string=('犬じゃありません犬ではありません');
    // string='犬がない食べない'
    // string=('食べてる');
    //  string=('犬があるんです');
    // string= '話した';
   // string='話した犬がいた'
    let tokens;
    let grammar;
    let vocab;
    try{
        tokens = await tokenizer.tokenize(string);
        grammar = await tokenizer.grammarTokenizer(string);
    }catch(err){
        console.log(err);
    }
 
    // let test='と';
    // let found= await Particles.findOne({Form:test,Chapter:{$lte:1}}) ?true : false;
    // console.log(`The result of the test on ${test} is ${found}`);
    grammar= await UpdatedParser(grammar, 4);
    vocab = await vocabTokenizer(string);
    let sizeofINdex= await Genki.find({Hiragana:{$size:2}});
    console.log(`Things with more than 1 hirgana are ${sizeofINdex}`);
    tokens='';
    //grammar='';
    res.send({
        tokens:tokens,
        grammar:grammar,
        vocab:vocab,
        size:sizeofINdex,
    });
})



module.exports=router;