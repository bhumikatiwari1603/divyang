'use strict'
var Sequelize = require("sequelize");

const openingModel = require('../model/Opening');




//Add Openings
exports.add = (req, res) => {
    try{
     
                req.body.user_id = req.payLoad.id;            
                openingModel.create(req.body)
                        .then(result => {

                          openingModel.findAll({
                                                        where : {
                                                                user_id: req.payLoad.id
                                                                }
                                                          })
                                                          .then(result =>{

                                                            return res.send({ error: false,message:"Job Opening Successfully Created",result:result })
                                                          
                                                          })
                                                          .catch(err => {
                                                            //res.end('error: ' + err)
                                                            return res.status(500).send({ error: true,message:err });
                                                        });
                        })
                        .catch(err => {
                            //res.end('error: ' + err)
                            return res.status(500).send({ error: true,message:err });
                        });
                    
    }catch(e){
        return res.status(500).send({ error: true,message:e.message});
    }
};



exports.getOpening = (req,res)=>{
    
      openingModel.findOne({
            where: {
              id     : req.params.id,  
              user_id: req.payLoad.id
            }
          })
          .then(result => {
            if (result) {
                    
                    res.status(200).json({error:false,message:"Opening...",result:result});

            } else {
               return res.status(400).json({ error:true,message:'Opening Not Available...' });
            }
          })
          .catch(err => {
            return res.status(500).json({ error:true,message: err.message});
          });

}

//Edit Opening
exports.edit = (req,res)=>{
        
  openingModel.count({
                where: {
                id : req.params.id,  
                user_id: req.payLoad.id
                }
            })
            .then(c => {
                if (c) {
                          openingModel.update(req.body, 
                                             {
                                              where: { id: req.params.id } 
                                             })  
                                            .then(result => {
                                            
                                                return res.status(200).json({error:false,message:"Data Successfully Updated..."});
                                            
                                            })
                                            .catch(err=>{
                                                
                                                return res.status(500).json({ error:true,message:err.message});     
                                            });
                         
                } else {          
                  return res.status(400).json({ error:true,message:'Job Opening Not Available...' });
                }
            })
            .catch(err => {
                return res.status(500).json({ error:true,message: err.message});
            });
          

}

exports.getAllOpenings = (req, res) => {
  
                  openingModel.findAll({
                                            where : {
                                                    user_id: req.payLoad.id
                                                    }
                                              })
                                              .then(result =>{

                                                return res.send({ error: false,message:"Openings...",result:result })
                                              
                                              })
                                              .catch(err => {
                                                //res.end('error: ' + err)
                                                return res.status(500).send({ error: true,message:err });
                                            });
      
}



