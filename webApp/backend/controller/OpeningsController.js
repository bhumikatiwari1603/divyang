'use strict'
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

const openingModel = require('../model/Opening');
const userApplicationModel = require('../model/UserApplication');
const userModel = require('../model/User');
const userSkillsModel = require('../model/UserSkills');
const userDisabilityModel = require('../model/UserDisability');
const userQualificationModel = require('../model/UserQualification');
const userEmploymentsModel = require('../model/UserEmployments');

var Request = require("request");

const got = require('got');





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

exports.getMyAllOpenedOpenings = (req, res) => {
  
                  openingModel.findAll({
                                            where : {
                                                    user_id: req.payLoad.id,
                                                    job_status : 'open'
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

exports.getMyAllOpenedOpeningsCount = (req, res) => {
  
  openingModel.count({
                            where : {
                                    user_id: req.payLoad.id,
                                    job_status : 'open'
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

exports.getMyAllClosedOpenings = (req, res) => {
  
  openingModel.findAll({
                            where : {
                                    user_id: req.payLoad.id,
                                    job_status : 'close'
                                    }
                              })
                              .then(result =>{

                                return res.send({ error: false,message:"Archived Openings...",result:result })
                              
                              })
                              .catch(err => {
                                //res.end('error: ' + err)
                                return res.status(500).send({ error: true,message:err });
                            });

}

exports.getMyAllClosedOpeningsCount = (req, res) => {

openingModel.count({
            where : {
                    user_id: req.payLoad.id,
                    job_status : 'close'
                    }
              })
              .then(result =>{
console.log("Resuly ",result);
                return res.send({ error: false,message:"Archived Openings...",result:result })
              
              })
              .catch(err => {
                //res.end('error: ' + err)
                return res.status(500).send({ error: true,message:err });
            });

}

//For User

exports.getAllOpenedOpenings = (req, res) => {
  
 openingModel.hasMany(userApplicationModel,{foreignKey:'opening_id'});

 console.log("Search Keyword ", req.params.searchKeyword);

 let condition={};

 condition = {job_status : 'open'}

 if(req.params.searchKeyword != "All"){

  condition = {
                job_title : {
                              [Op.like]: `%${req.params.searchKeyword}%`
                            }
              }
    
}
  
  openingModel.findAll({
                            where : condition,
                            include : [
                                       {
                                        model:userApplicationModel,
                                        /*where :{
                                          user_id: {
                                                    [Op.ne]:req.payLoad.id
                                                   }
                                         }*/
                                      } 
                                      ]       
                              })
                              .then(result =>{

                                return res.send({ error: false,message:"Openings...",result:result })
                              
                              })
                              .catch(err => {
                                //res.end('error: ' + err)
                                return res.status(500).send({ error: true,message:err });
                            });

}

exports.getAllOpenedOpeningsCount = (req, res) => {

  //openingModel.hasMany(userApplicationModel,{foreignKey:'opening_id'});
    openingModel.count({
                where : {
                        job_status : 'open'
                        },
                        /*include : [
                          {
                          model:userApplicationModel,
                          where :{
                            user_id: {
                                      [Op.ne]:req.payLoad.id
                                      }
                            }
                        } 
                      ]*/
                  })
                  .then(result =>{

                    return res.send({ error: false,message:"Openings Count...",result:result })
                  
                  })
                  .catch(err => {
                    //res.end('error: ' + err)
                    return res.status(500).send({ error: true,message:err });
                });

}


//Apply
exports.apply = (req,res)=>{
    
  try{
     
    req.params.user_id = req.payLoad.id;
    req.params.opening_id = req.params.openingId;

    //disability count
    userDisabilityModel.count({
       where : {
                user_id : req.payLoad.id
              },             
        })
        .then(c =>{

          if(c>0){

                    userSkillsModel.count({
                      where : {
                              user_id : req.payLoad.id
                            },             
                      })
                      .then(c =>{
              
                        if(c>0){
              
                                  userQualificationModel.count({
                                    where : {
                                            user_id : req.payLoad.id
                                          },             
                                    })
                                    .then(c =>{
                            
                                                  if(c>0){
                                        
                                                    userApplicationModel.create(req.params)
                                                    .then(result => {
                                        
                                                      return res.status(200).send({error:false,message:"Applied Successfully...",openingId:req.params.openingId});   
                                                      
                                                    })
                                                    .catch(err => {
                                                        //res.end('error: ' + err)
                                                        return res.status(500).send({ error: true,message:err });
                                                    });
                                        
                                        
                                                  }else{
                                                    return res.status(500).send({ error: true,message:"Qualifications Should be Added before Applying..." });
                                                  }
                                    
                                    })
                                    .catch(err => {
                                      //res.end('error: ' + err)
                                      return res.status(500).send({ error: true,message:err });
                                  });
                                
              
              
                        }
                        else{
                          return res.status(500).send({ error: true,message:"Skills Should be Added before Applying..." });
                        }
                      
                      })
                      .catch(err => {
                        //res.end('error: ' + err)
                        return res.status(500).send({ error: true,message:err });
                    });


          }else{
            return res.status(500).send({ error: true,message:"Disabilities Should be Added before Applying..." });
          }
        
        })
        .catch(err => {
          //res.end('error: ' + err)
          return res.status(500).send({ error: true,message:err });
      });

    /*userApplicationModel.create(req.params)
            .then(result => {

              return res.status(200).send({error:false,message:"Applied Successfully...",openingId:req.params.openingId});   
              
            })
            .catch(err => {
                //res.end('error: ' + err)
                return res.status(500).send({ error: true,message:err });
            });*/
        
      }catch(e){
      return res.status(500).send({ error: true,message:e.message});
    }

}

//User
exports.myActiveApplicationsCount = (req, res) => {

  openingModel.hasMany(userApplicationModel,{foreignKey:'opening_id'});

    openingModel.count({
                /*where : {
                        job_status : 'open'
                        },*/
                        include : [
                          {
                          model:userApplicationModel,
                          where :{
                            user_id: {
                                      [Op.eq]:req.payLoad.id
                                      }
                            }
                        } 
                      ]
                  })
                  .then(result =>{

                    return res.send({ error: false,message:"My Active Applications...",result:result })
                  
                  })
                  .catch(err => {
                    //res.end('error: ' + err)
                    return res.status(500).send({ error: true,message:err });
                });

}

exports.myActiveApplications = (req, res) => {

  openingModel.hasMany(userApplicationModel,{foreignKey:'opening_id'});

    openingModel.findAll({
                /*where : {
                        job_status : 'open'
                        },*/
                        include : [
                          {
                          model:userApplicationModel,
                          where :{
                            user_id: {
                                      [Op.eq]:req.payLoad.id
                                      }
                            }
                        } 
                      ]
                  })
                  .then(result =>{

                    return res.send({ error: false,message:"My Active Applications...",result:result })
                  
                  })
                  .catch(err => {
                    //res.end('error: ' + err)
                    return res.status(500).send({ error: true,message:err });
                });

}


//Applications for my created Openings
exports.myUserApplications = (req, res) => {

  openingModel.hasMany(userApplicationModel,{foreignKey:'opening_id'});
  userApplicationModel.belongsTo(userModel,{foreignKey:'user_id'});
  userModel.hasMany(userDisabilityModel,{foreignKey:'user_id'});
  userModel.hasMany(userSkillsModel,{foreignKey:'user_id'});
  userModel.hasMany(userQualificationModel,{foreignKey:'user_id'});
  //userModel.hasMany(userEmploymentsModel,{foreignKey:'user_id'});

    openingModel.findAll({
                where : {
                        user_id : req.payLoad.id
                        },
                        include : [
                          {
                          model:userApplicationModel,
                          include : [
                                  {
                                    model: userModel,
                                    attributes:['id','first_name','last_name','email','phone_num','address','profile_img_file_name'],
                                    include : [
                                      {
                                        model: userDisabilityModel,
                                        //attributes:['id','first_name','last_name','email','phone_num']
                                    },
                                    {
                                      model: userSkillsModel,
                                      //attributes:['id','first_name','last_name','email','phone_num']
                                    },
                                    {
                                      model: userQualificationModel,
                                      //attributes:['id','first_name','last_name','email','phone_num']
                                    }
                                 ] 
                                }
                             ] 
                        } 
                      ]
                  })
                  .then(result =>{

                    return res.send({ error: false,message:"Applications for My Openings...",result:result })
                  
                  })
                  .catch(err => {
                    //res.end('error: ' + err)
                    return res.status(500).send({ error: true,message:err });
                });

}

//Applications for my created Openings
/*exports.myUserApplicationsCount = (req, res) => {

  openingModel.hasMany(userApplicationModel,{foreignKey:'opening_id'});

    openingModel.count({
                where : {
                        user_id : req.payLoad.id
                        },
                        include : [
                          {
                          model:userApplicationModel 
                        } 
                      ]
                  })
                  .then(result =>{

                    return res.send({ error: false,message:"Applications Count for My Openings...",result:result })
                  
                  })
                  .catch(err => {
                    //res.end('error: ' + err)
                    return res.status(500).send({ error: true,message:err });
                });

}*/

exports.myUserApplicationsCount = (req, res) => {

  userApplicationModel.belongsTo(openingModel,{foreignKey:'opening_id'});

    userApplicationModel.count({
                where : {
                         '$opening.user_id$' : req.payLoad.id
                        },
                        include : [
                          {
                          model:openingModel 
                        } 
                      ]
                  })
                  .then(result =>{

                    return res.send({ error: false,message:"Applications Count for My Openings...",result:result })
                  
                  })
                  .catch(err => {
                    //res.end('error: ' + err)
                    return res.status(500).send({ error: true,message:err });
                });

}

const server = 'http://localhost:5000';
let fixedHeaders = {
    'json': true,
    'Content-Type': 'application/json; charset=utf-8',
    'user-agent': 'ciphertrick-server'
}

exports.getAllRecommendedJobs = (req, res) => {
                            try{
                            
                              Request.get(`http://18.188.67.177:5000/index?user_id=${req.payLoad.id}`, (error, response, body) => {
                              if(error) {
                                  return console.log("Error form ML ",error);
                              }
                              
                              var result = JSON.parse(body.replace(/\bNaN\b/g, "null"));
                              
                              return res.send({ error: false,message:"Recommended Jobs....",resultSize:Object.entries(result).length,result: Object.entries(result)});  
                              
                          });
                            
                              /*Request.post({
                              "headers": { "content-type": "application/json" },
                              "url": "http://localhost:5000/index",
                              "body": JSON.stringify({
                                  'userid': '47'
                              })
                          }, (error, response, body) => {
                              if(error) {
                                  return console.dir(error);
                              }
                              console.dir(JSON.parse(body));
                          });*/  
                          
                          

                        }catch(e){
                          console.log("Exception ",e);
                        }

}


/*module.exports.addUser = async function(user1){
  try {
      const user = await this.callapi(`/index`, 'post', user1, {});
  } catch(e){
      console.log(e);
  }
};

module.exports.callapi =(path, method, body = {}, newheaders ={})=>{
  const url = server + path;
  let headers = Object.assign(fixedHeaders, newheaders);
  const options = {
      body: JSON.stringify(body),
      headers: headers
  }
  return got[method](url, options).then((data)=>{
      if(typeof data.body === 'string'){ //expecting data to be json object
          return JSON.parse(data.body);
      }
      return data.body;
  })
  .catch((err)=>{
       console.log("Error in request Handler",err);
      //logger.error(`[request Handler]`, err);
  });
}*/