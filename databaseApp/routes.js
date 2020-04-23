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
router.post('/results.html',function(req,res){
    console.log(req.body);
    Genki.find({Kanji:req.body.text}).then(function(words){
        console.log(words);
        res.render('results',{data:words});
    })
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

module.exports=router;
// Genki.find({Kanji:'今'}).then(function(words){
//    console.log(words); 
// });