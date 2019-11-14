'use strict'
const express = require('express')
const router = express.Router();
const cors = require('cors')
//var multer  = require('multer');

const userModel = require('../model/User');
const middlewareFileUpload    = require('../middleware/fileHandlingConfig');

router.use(cors());

//Profile Image Uploading
exports.profileImageSaving = (req, res,next) => {
    try{
             //console.log('Image Destination ',middlewareFileUpload.profileImgDestination);
        if(!req.file) {
            console.log("File not found");
           res.status(500);
           return next(err);
        }

            const userData = {profile_img_file_name:req.profileImageName};
            //console.log("user data ",userData);
            userModel.count({
                where: {
                id: req.payLoad.id,
                }
            })
            .then(c => {
                if (c) {
                            userModel.update(userData, 
                                             {
                                              where: { id: req.payLoad.id } 
                                             })  
                                            .then(result => {
                                            
                                                if(result)
                                                    return res.status(200).send({error:false,message:"Profile Image Uploaded Successfully...",profileImageName:userData.profile_img_file_name});
                                                else
                                                    return res.status(400).send({error:true,message:"Unable to upload Profile Image.."});
                                            
                                            })
                                            .catch(err=>{
                                                //console.log("Error is ",err);
                                                return res.status(500).send({ error:true,message:err.message});     
                                            });
                         
                } else {          
                  return res.status(400).send({ error:true,message:'User does not exist' });
                }
            })
            .catch(err => {
                return res.status(400).send({ error:true,message: err});
            });



    }catch(e){
        return res.status(500).send({ error: true,message:e});
    }
};

exports.getProfileImage = (req,res,next) => {
    
    userModel.findByPk(req.payLoad.id,{attributes:['profile_img_file_name']})
    .then(user => {
        if (user) {
                    return res.status(200).json({error:false,imagePathWithName:middlewareFileUpload.profileImgDestination+user.profile_img_file_name});
                 
        } else {          
          return res.status(400).send({ error:true,message:'User does not exist' });
        }
    })
    .catch(err => {
        return res.status(500).send({ error:true,message: err.message});
    });


}