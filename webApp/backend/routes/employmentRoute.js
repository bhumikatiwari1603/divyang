var express = require('express');
var router = express.Router();
var employmentController = require('../controller/EmploymentController') ;
let middleware = require('../middleware/verifyToken');



router.post('/employment',middleware.verifyToken, employmentController.add);

router.put('/employment/:id',middleware.verifyToken, employmentController.edit);

router.get('/employment/:id',middleware.verifyToken,employmentController.getMyEmployement);

router.get('/myEmployments',middleware.verifyToken,employmentController.getMyAllEmployements);


module.exports = router;