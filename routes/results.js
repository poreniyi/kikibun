const router = require('express').Router();
let tokenizer=require('../kuromojinParser/Tokenizer');
const { grammarTokenizer } = require('../kuromojinParser/Tokenizer');
const Parser=require('../Parser/GenkiParser');
let UpdatedParser=Parser.GenkiParser;
const database= require('../databaseApp/dataApp');


router.post('/resultsProcess', async (req, res) => {
    let data = await tokeniZAndQuery(req, res);
    req.session.data = data;
    console.log(data.gramStats);
    res.redirect('/results');
});
router.get('/results', (req, res) => {
    let data = req.session.data;
    if (!data) {
        res.render('Home');
    } else {
        res.render('Results3',
            {
                original: data.original,
                grammar: data.grammar,
                vocab: data.vocab,
                Chapter: data.Chapter,
                NLVL: data.JLPT,
                gramStats: data.gramStats,

            });
    }
})

textValidator = (string) => {
    string.trim();
    let sentences = string.split('。');
    for (let i = 0; i < sentences.length; i++) {
        if (!sentences[i].replace(/\s/g, '').length) {
            console.log(`string ${i} only contains whitespace (ie. spaces, tabs or line breaks)`);
            sentences.splice(i, 1);
        }
    }
    return sentences;
}

async function tokeniZAndQuery(req, res) {
    let text = req.body.text.trim();
    console.log(`The text is ${text}`);
    let sentences = textValidator(req.body.text);
    let grammarSentences = [];
    let grammarStats = [];
    let vocabSentences = [];
    let data = {};
    data.Chapter = req.body.Genki;
    data.JLPT = req.body.JLPT;
    console.log("Results page:");
    let jlptLvl = req.body.JLPT||0
    console.log(`The Genki Chapter is ${req.body.Genki} and the JLPT lvl is ${jlptLvl}`);
    try {
        if (/[^\u0000-\u00ff]/.test(text) == false) {
            throw 'Not japanese';
        }
        let totalElapsedTime = 0;
        for (let i = 0; i < sentences.length; i++) {
            let start = Date.now();
            let grammar = await grammarTokenizer(sentences[i]);
            let end = Date.now();
            let elapsedTime = (end - start) / 1000;
            totalElapsedTime += elapsedTime;
            console.log(`For grammar tokenizer It took sentence${i} ${elapsedTime}  seconds`);
            start = Date.now();
            let vocab = await vocabTokenizer(sentences[i]);
            end = Date.now();
            elapsedTime = (end - start) / 1000;
            console.log(`For vocab tokenizer It took sentence${i} ${elapsedTime}  seconds`);
            totalElapsedTime += elapsedTime;
            start = Date.now();
            grammar = await UpdatedParser(grammar, req.body.Genki, jlptLvl);
            end = Date.now();
            elapsedTime = (end - start) / 1000;
            totalElapsedTime += elapsedTime;
            console.log(`For the parser It took sentence${i} ${elapsedTime}  seconds to complete`);
            let updatedGrammmar = grammar.tokens;
            grammarStats.push(grammar.stats);
            grammarSentences.push(updatedGrammmar);
            vocabSentences.push(vocab);
        }
        data.original = text;
        data.grammar = grammarSentences;
        data.vocab = vocabSentences;
        data.Chapter = req.body.Genki;
        data.NLVL = req.body.JLPT;
        data.gramStats = grammarStats,
            console.log(`Total Elapsed time is:${totalElapsedTime}`);
    } catch (err) {
        console.log(err);
        let message = 'Something has gone wrong';
        if (err.message = 'Not Japanese') {
            message = 'Please enter Japanese input';
        }
        res.render('Home', { err: message });
    }
    return data;
}
module.exports = router;