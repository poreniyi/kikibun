const router = require('express').Router();

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
    let dataObj={};
    tokens = await tokenizer.tokenize(text);
    grammar=await grammarTokenizer(text);
    let updatedGrammar;
    //vocab=await vocabTokenizer(text);

    console.log(tokens);
    updatedGrammar=await UpdatedParser(grammar,22);
    res.send({
        tokens:tokens,
        myTokenizer:grammar,
        updatedGrammar:updatedGrammar.tokens,
        stats:updatedGrammar.stats,
        vocab:vocab,
    })
})
router.get('/ajaxtest',async (req,res)=>{
    console.log(`This is an ajax request`);
    console.log(`The month is ${req.query.month}`);
    console.log(`The year is ${req.query.year}`);

    let requestMonth=parseInt(req.query.month)+1;
    let requestyear =parseInt(req.query.year);
    let obj={};
    obj.days=[];
    if(requestyear!=undefined){
        let data=await Articles.aggregate([
            {$project:{month:{$month:'$date'},year:{$year:'$date'},day:{$dayOfMonth:'$date'}}},
            {$match:{month:requestMonth, year:requestyear}}
        ]);
        data.forEach(element=>{
            obj.days.push(element.day);
        })
        console.log(data);
    }
    res.send(obj);
})

module.exports=router;