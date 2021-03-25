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
module.exports=router;