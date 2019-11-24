var express = require('express');
var router = express.Router();
var openingsController = require('../controller/OpeningsController') ;
let middleware = require('../middleware/verifyToken');



router.post('/opening',middleware.verifyToken, openingsController.add);

router.put('/opening/:id',middleware.verifyToken, openingsController.edit);

router.get('/opening/:id',middleware.verifyToken,openingsController.getOpening);

router.get('/myOpenings',middleware.verifyToken,openingsController.getAllOpenings);


module.exports = router;
