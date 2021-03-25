let router=require('express').Router();

router.use('/',require('./homepage'));
router.use('/',require('./NHK'));
router.use('/',require('./results'));
router.use('/',require('./testRoutes'));
router.use('/',require('./vocabList'));


module.exports=router;