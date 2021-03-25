const router = require('express').Router();
path = require('path')
const database = require("../databaseApp/dataApp");
const Genki = database.Genki;


router.get("/GenkiVocabList", async (req, res) => {
    let chapter = parseInt(req.query.chapter);
    let pageSize = 20;
    let data;
    let page = parseInt(req.query.page)
    if (!page) {
        console.log("NO page");
        data = await Genki.find({ Chapter: chapter });
    } else if (chapter < 24 && chapter > 0 && page > 0) {
        //let size = await Genki.estimatedDocumentCount({Chapter:chapter})
        let size = await Genki.countDocuments({ Chapter: chapter });
        console.log(`Chapter ${chapter}: has:${size} words`);
        let max = pageSize * (Math.floor(size / pageSize));
        let overflow = size - max
        console.log(`max is ${max}`);
        let totalDocs = pageSize * page;
        if (totalDocs > size && page == max) {
            // console.log(`page is ${req.query.page}`)
            data = await Genki.find({ Chapter: chapter }).limit(overflow).skip(max);
        } else if (page > 0 && page < max) {
            console.log(`Max is:${max} and page is: ${page}`)
            let skipAmount = (page - 1) * 20;
            data = await Genki.find({ Chapter: chapter }).limit(pageSize).skip(skipAmount);
        }
    }
    if (data) {
        res.render('chapterViews', {
            chapter: req.query.chapter,
            words: data
        });
    }
    else {
        res.status(404).sendFile(path.join(__dirname, '..', 'HtmlFiles', '404.html'));
    }
});

module.exports=router;