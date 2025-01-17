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


//All Opened openings
router.get('/allOpenings/:searchKeyword',middleware.verifyToken,openingsController.getAllOpenedOpenings);

//All Opened openings count
router.get('/allOpeningsCount',middleware.verifyToken,openingsController.getAllOpenedOpeningsCount);

//apply
router.get('/apply/:openingId',middleware.verifyToken, openingsController.apply);

//My Active Applications
router.get('/myActiveApplications',middleware.verifyToken,openingsController.myActiveApplications);

//My Active Applications count
router.get('/myActiveApplicationsCount',middleware.verifyToken,openingsController.myActiveApplicationsCount);

//My User Applications
router.get('/myUserApplications',middleware.verifyToken,openingsController.myUserApplications);

//My User Applications count
router.get('/myUserApplicationsCount',middleware.verifyToken,openingsController.myUserApplicationsCount);


//All Recommended Jobs
router.get('/allRecommendedJobs',middleware.verifyToken,openingsController.getAllRecommendedJobs);


module.exports = router;
