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
const { nextTick } = require('process');
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
router.get('/results',(req,res)=>{
    let data=req.session.data;
    if(!data){
        res.render('Home');
    }else{
        res.render('Results3',
        {   original:data.original,
            grammar:data.grammar,
            vocab:data.vocab,
            Chapter:data.Chapter,
            NLVL:data.JLPT,
            gramStats:data.gramStats,
            
        }); 
    }  
})
router.post('/resultsProcess',async(req,res)=>{
    let data=await tokeniZAndQuery(req);
    req.session.data=data;
    console.log(data.gramStats);
    res.redirect('/results');
 
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
   let articleDate=new Date(articles[0].date);
   console.log(`The Date of this article is:${articleDate}`);
   let today=new Date();
   let todayDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
   if(todayDate>articleDate){
       let difference=today.getTime()-articleDate.getTime();
       let days=1000*60*60*24;
       let dayDiffernce= Math.round(difference/days);
       today.getMonth()-articleDate.getMonth();
        console.log(`User viewing old article. It is ${dayDiffernce} days old`);
   }
   console.log(`Todays date is ${todayDate}`);
   console.log(`Article's date is ${articleDate}`);

//    console.log(array);
res.render("NHK",{
    articles:articles,
    pie:2
})
});
router.post('/NHK',async (req,res)=>{
   let articleText=req.body.Text;
   articleText=articleText.substring(0,Math.min(articleText.length,500));
   let sentences=articleText.split('。');
   let grammarSentences=[];
   let Chapter=parseInt(req.body.Genki);
   let vocabSentences=[];
   for(let i=0;i<sentences.length;i++){
       let grammar= await grammarTokenizer(sentences[i]); 
       //grammar=await UpdatedParser(grammar,22);
       let vocab=await vocabTokenizer(sentences[i]); 
       grammarSentences.push(grammar);
       vocabSentences.push(vocab);
    }
    // res.send(vocabSentences);
   res.render('Results3',
   {   original:articleText,
       grammar:grammarSentences,
       vocab:vocabSentences,
    //    Chapter:req.body.Genki,
    //    NLVL:req.body.JLPT,
   });

})
router.get("/test", async (req,res)=>{
    res.render('Test.ejs');
})
router.post('/testResults', async (req,res)=>{
    console.log(req.body.text);
    let text=req.body.text.trim();
     text=text.trim();
    let array=[];
    array=text.split('。');
    let grammar;
    let vocab;
    let tokens;
    tokens = await tokenizer.tokenize(text);
    grammar=await grammarTokenizer(text);
    let updatedGrammar;
    vocab=await vocabTokenizer(text);
    console.log(grammar);
    updatedGrammar=await UpdatedParser(grammar,22);
    console.log(tokenizer.testConditons());
    res.send({
        tokens:tokens,
        myTokenizer:grammar,
        updatedGrammar:updatedGrammar.tokens,
        stats:updatedGrammar.stats,
        vocab:vocab,
    })
})

textValidator=(string)=>{
    string.trim();
    let sentences=string.split('。');
    for(let i=0;i<sentences.length;i++){
        if (!sentences[i].replace(/\s/g, '').length) {
            console.log(`string ${i} only contains whitespace (ie. spaces, tabs or line breaks)`);
            sentences.splice(i,1);
          }
    }
    return sentences;
}

async function  tokeniZAndQuery (req){
    let text=req.body.text.trim();
    console.log(`The text is ${text}`);
    let sentences=textValidator(req.body.text);
    let grammarSentences=[];
    let grammarStats=[];
   let vocabSentences=[];
   let data={};
   data.Chapter=req.body.Genki;
   data.JLPT=req.body.JLPT;
    console.log("Results page:");
    let jlptLvl=req.body.JLPT
    if (!jlptLvl){
        jlptLvl=0;
    }
    console.log(`The Genki Chapter is ${req.body.Genki} and the JLPT lvl is ${jlptLvl}`);

        try{
            if (/[^\u0000-\u00ff]/.test(text)==false){
                throw 'Not japanese';
             }
             let totalElapsedTime=0;
            for(let i =0;i<sentences.length;i++){
                let start=Date.now();
                let grammar= await grammarTokenizer(sentences[i]); 
                let end =Date.now();
                let elapsedTime=(end-start)/1000;
                totalElapsedTime+=elapsedTime;
                console.log(`For grammar tokenizer It took sentence${i} ${elapsedTime}  seconds`);
                start=Date.now();
                let vocab=await vocabTokenizer(sentences[i]);
                end=Date.now();
                elapsedTime=(end-start)/1000;
                console.log(`For vocab tokenizer It took sentence${i} ${elapsedTime}  seconds`);
                totalElapsedTime+=elapsedTime;
                start=Date.now();
                grammar=await UpdatedParser(grammar,req.body.Genki,jlptLvl); 
                end=Date.now();
                elapsedTime=(end-start)/1000;
                totalElapsedTime+=elapsedTime;
                console.log(`For the parser It took sentence${i} ${elapsedTime}  seconds to complete`);
                let updatedGrammmar=grammar.tokens;
                grammarStats.push(grammar.stats);
                grammarSentences.push(updatedGrammmar);
                vocabSentences.push(vocab);
            }
data.original=text;
data.grammar=grammarSentences;
data.vocab=vocabSentences;
data.Chapter=req.body.Genki;
data.NLVL=req.body.JLPT;
data.gramStats=grammarStats,
             console.log(`Total Elapsed time is:${totalElapsedTime}`);
              }catch(err){
            console.log(err);
            let message='Something has gone wrong';
            if(err.message='Not Japanese'){
                message='Please enter Japanese input';
            }
            res.render('Home',{err:message});
        } 
        return data; 
}
function getDataBack(req,res){
    let data=req.dataProcessed;
    res.render('Results3',
    {   original:text,
        grammar:grammarSentences,
        vocab:vocabSentences,
        Chapter:req.body.Genki,
        NLVL:req.body.JLPT,
        gramStats:grammarStats,
    });
}
module.exports=router;