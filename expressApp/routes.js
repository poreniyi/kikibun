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

router.get('/About',function(req,res){
    res.render("About");
});
router.get('/',function(req,res){
    res.render("Home");
});
router.post('/results.html',async(req,res)=>{
     let text=req.body.text;
     console.log("Results page: \n")
        // try{
        //     console.log(req.body);
        //     let result = await Parser.Chapter1(req.body.text.trim());
        //     console.log("MY RESULT IS:" +result);
        //     res.render('results',{ 
        //         data: result, 
        //         originalSentence:text});
        // }
        // catch(error){
        //     console.log(error);
        // }
        // part 2
        // try{
        //     console.log(req.body.Genki);
        //     results = await tokenizer.tokenize(req.body.text)
        //     res.render('Results2',{data:results})
        // }catch(error){
        //     console.log(error);
        // }      
        let result;
        //results = await tokenize2('よかったいい食べなかった学生');
        results =await tokenize2(text);
        console.log(`Genki:${req.body.Genki}`);
        for(let i=0;i<results.length;i++){
            let word=results[i].base;
            if(await dbScripts.documentExists(word,req.body.Genki)){
                results[i].setStatus();
            }
        }
        for(let i=0;i<results.length;i++){
            process.stdout.write(`Surface Form:${results[i].surfaceForm}`);
            results[i].conjugatedParts.forEach(element=>{
                console.log(`${element}`);
            })
        }
        let testArr=[];
        let apple=await Genki.find({Kanji:'食べる'});
        let pie=await Genki.find({Hiragana:'いい'});
        testArr.push(pie);
        testArr.push(apple);
        res.send({
            vocab:results,
            stuff:testArr,
        })
       // res.send({data:results ,stuff:pie});
        
        
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

let tokenizer=require('../kuromojinParser/Tokenizer');
let tokenOne=tokenizer.tokenizeOne;
let tokenize2=tokenizer.tokenize2;
let UpdatedParser=Parser.GenkiParser;
router.get("/test", async (req,res)=>{
    let results;

    // results= await Parser.Chapter1Update('私は高校生です。');
   // results= await Genki.find({length:{$gte:5}})
    //results = await tokenize2('よかったいい食べなかった学生');
    string=('食べていませんでした');
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
    grammar= await UpdatedParser(grammar, 22);
  //  results= await tokenizer.tokenizeOne('です');
      //results= await tokenOne('です');
       // console.log(results);
    //results=await Parser.Chapter1Update('空港高校生');
    //res.render('Results2',{data:results})
    res.send({
        tokens:tokens,
        grammar:grammar
    });
})



module.exports=router;