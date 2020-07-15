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
    let sentences=textValidator(req.body.text);
    
    let grammarSentences=[];
    let grammarStats=[];
   let vocabSentences=[];
    console.log("Results page: \n");
    console.log(`The Genki Chapter is ${req.body.Genki} and the JLPT lvl is ${req.body.JLPT}`);
        try{
            if (/[^\u0000-\u00ff]/.test(text)==false){
                throw 'Not japanese';
             }
            for(let i =0;i<sentences.length;i++){
                let grammar= await grammarTokenizer(sentences[i]); 
                let vocab=await vocabTokenizer(sentences[i]);
                grammar=await UpdatedParser(grammar,req.body.Genki); 
                let updatedGrammmar=grammar.tokens;
                grammarStats.push(grammar.percentage);
                grammarSentences.push(updatedGrammmar);
                vocabSentences.push(vocab);
            }
            console.log(grammarStats);
            res.render('Results3',
            {   original:text,
                grammar:grammarSentences,
                vocab:vocabSentences,
                Chapter:req.body.Genki,
                NLVL:req.body.JLPT,
                gramStats:grammarStats,
            });
        }catch(err){
            res.render('Home');
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
    // string='毎日歩くよく話す時々食べる中国のほうが日本より静かな花大きいです食べます犬があります';
    // string='あります';
    // let tokens;
    // let grammar;
    // let vocab;
    // try{
    //     tokens = await tokenizer.tokenize(string);
    //     grammar = await tokenizer.grammarTokenizer(string);
    // }catch(err){
    //     console.log(err);
    // }
    // // let lasToken=grammar[grammar.length-1];
    // // let lastTokenText=lasToken.conjugatedParts[0].text;
    // // let lastTokenFound=await Particles.findOne({Form:lastTokenText});
    // let allGrammar= await UpdatedParser(grammar, 22);
    // let percentage=allGrammar.percentage;
    // grammar=allGrammar.tokens;
    // // let testPolite=await Particles.find({Form:'ます'});
    // //  console.log(`The last token is ${lasToken}`);
    // vocab = await vocabTokenizer(string);
    // tokens='';
    // //grammar='';
    // vocab='';
    // res.send({
    //     tokens:tokens,
    //     grammar:allGrammar,
    //     vocab:vocab,
    //     percentage:percentage,
    // });
    // res.send({word:lasToken,found:lastTokenFound});
})
router.post('/testResults', async (req,res)=>{
    console.log(req.body.text);
    let text=req.body.text.trim();
     text=text.trim();
    let array=[];
    array=text.split('。');
    res.send(array);
    // let grammar;
    // let vocab;
    // let tokens;
    // tokens = await tokenizer.tokenize(array);
    // grammar=await grammarTokenizer(array);
    // let updatedGrammar;
    // vocab=await vocabTokenizer(array);
    // console.log(grammar);
    // updatedGrammar=await UpdatedParser(grammar,22);
    res.send({
        // tokens:tokens,
        // myTokenizer:grammar,
        // updatedGrammar:updatedGrammar.tokens,
        // stats:updatedGrammar.stats,
        // vocab:vocab,
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
    let lastSentence=sentences[sentences.length-1];
    console.log(`The last sentence is ${lastSentence} the end`);
    console.log(`The last sentence is sentence`);
    return sentences;
}

module.exports=router;