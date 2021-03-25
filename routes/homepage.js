const router=require('express').Router();

router.get('/About',function(req,res){
    res.render("About");
});
router.post('/',(req,res)=>{
    let article=req.body.Text.trim();
    res.render("Home",{article:article});
})
router.get('/',function(req,res){
    res.render("Home");
});
module.exports=router;