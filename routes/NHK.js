const router = require('express').Router();
const database= require('../databaseApp/dataApp');
const Articles=database.Articles;

router.get("/NHK",async  (req,res)=>{
    res.render("NHK",{})
});
router.get('/getAvailableArticleDays',async (req,res)=>{
    //gets list of Articles for that month
    let requestMonth=parseInt(req.query.month)+1;
    let requestyear =parseInt(req.query.year);
    let obj={};
    obj.days=[];
    if(requestyear!=undefined){
        let data=await Articles.aggregate([
            {$project:{month:{$month:'$date'},year:{$year:'$date'},day:{$dayOfMonth:'$date'}}},
            {$match:{month:requestMonth, year:requestyear}},
            {$project:{day:1,_id:0}}
        ]);
        console.log(data);
        data.forEach(element=>{
            obj.days.push(element.day);
        })
    }
    res.send(obj);
})

router.get('/getArticles', async(req,res)=>{
    let requestMonth=parseInt(req.query.month)+1;
    let requestyear =parseInt(req.query.year);
    let requestDay=parseInt(req.query.day);
    let data=await Articles.aggregate([
        {$project:{Articles:1,month:{$month:'$date'},year:{$year:'$date'},day:{$dayOfMonth:'$date'}}},
        {$match:{month:requestMonth, year:requestyear,day:requestDay}}
    ]);
    let articleData=data[0].Articles;
    console.log(articleData);
    res.send(articleData);
})
module.exports=router;