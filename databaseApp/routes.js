const express=require('express');
const router=express.Router();
const N5=require("./dataApp");

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
    res.render('results',{data:req.body});
});
for(let i =1;i<6;i++){
    let path="/N";
    path+=i
    router.get(path,function(req,res){
        let view= path.substring(1);
        N5.find({}).then(function(words){
            res.render(view,{data:words});
        });
    });
};

module.exports=router;