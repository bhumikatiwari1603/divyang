var express = require('express');
var router = express.Router();
//const multer = require('multer');

let middlewareVerifyToken   = require('../middleware/verifyToken');
let middlewareFileUpload    = require('../middleware/fileHandlingConfig');
var fileUploadingController = require('../controller/FileHandlingController') ;

//Profile Image
router.post('/profileImage',middlewareVerifyToken.verifyToken,middlewareFileUpload.uploadProfileImage.single('profileImage') ,fileUploadingController.profileImageSaving);

//Profile Image
router.get('/profileImage',middlewareVerifyToken.verifyToken,middlewareFileUpload.uploadProfileImage.single('profileImage') ,fileUploadingController.getProfileImage);


module.exports = router;
