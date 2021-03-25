const router = require('express').Router();
let tokenizer=require('../kuromojinParser/Tokenizer');
const { grammarTokenizer } = require('../kuromojinParser/Tokenizer');
const Parser=require('../Parser/GenkiParser');
let UpdatedParser=Parser.GenkiParser;
const database= require('../databaseApp/dataApp');
const Articles=database.Articles;

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


module.exports=router;