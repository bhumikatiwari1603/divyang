var express = require('express');
var router = express.Router();
var qualifcationsController = require('../controller/QualificationsController') ;
let middleware = require('../middleware/verifyToken');


router.post('/qualification',middleware.verifyToken, qualifcationsController.add);

router.put('/qualification/:id',middleware.verifyToken, qualifcationsController.edit);

router.get('/qualification/:id',middleware.verifyToken,qualifcationsController.getMyQualifications);

router.get('/myQualifications',middleware.verifyToken,qualifcationsController.getMyAllQualifications);


module.exports = router;