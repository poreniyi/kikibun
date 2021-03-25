let router=require('express').Router();

router.use('/',require('./homepage'));//done
router.use('/',require('./NHK'));//done
router.use('/',require('./results'));// i hope
router.use('/',require('./testRoutes'));//dopne I think
router.use('/',require('./vocabList'));//done


module.exports=router;