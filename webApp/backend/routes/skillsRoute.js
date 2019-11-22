var express = require('express');
var router = express.Router();
var skillsController = require('../controller/SkillsController') ;
let middleware = require('../middleware/verifyToken');



router.post('/skill',middleware.verifyToken, skillsController.add);

router.put('/skill/:id',middleware.verifyToken, skillsController.edit);

router.get('/skill/:id',middleware.verifyToken,skillsController.getMySkills);

router.get('/mySkills',middleware.verifyToken,skillsController.getMyAllSkills);


module.exports = router;