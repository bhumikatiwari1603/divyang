var express = require('express');
var router = express.Router();
var openingsController = require('../controller/OpeningsController') ;
let middleware = require('../middleware/verifyToken');



router.post('/opening',middleware.verifyToken, openingsController.add);

router.put('/opening/:id',middleware.verifyToken, openingsController.edit);

router.get('/opening/:id',middleware.verifyToken,openingsController.getOpening);

//Opened
router.get('/myOpenings',middleware.verifyToken,openingsController.getMyAllOpenedOpenings);

//Opened
router.get('/myOpeningsCount',middleware.verifyToken,openingsController.getMyAllOpenedOpeningsCount);

//Closed
router.get('/myClosedOpenings',middleware.verifyToken,openingsController.getMyAllClosedOpenings);
//Closed
router.get('/myClosedOpeningsCount',middleware.verifyToken,openingsController.getMyAllClosedOpeningsCount);


module.exports = router;
