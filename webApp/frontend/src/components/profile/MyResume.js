import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userProfile } from "../../actions/profileActions";
import { getAllDisabilities} from "../../actions/disabilityActions";
import { getAllSkills} from "../../actions/skillActions";
import { getAllQualifications} from "../../actions/qualificationActions";
import { getAllEmploymentDetails} from "../../actions/employmentActions";
import classnames from "classnames";
import {API_URL} from "../../actions/url";

class MyResume extends Component {
  constructor() {
    super();
    this.state = {
      userDetails : {},
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.userProfile();
    this.props.getAllDisabilities();
    this.props.getAllSkills();
    this.props.getAllQualifications();
    this.props.getAllEmploymentDetails();
}

  componentWillReceiveProps(nextProps) {
     //console.log("New Props..",nextProps);

     if (Object.keys(nextProps.profile).length!=0) {
       const userDetails = nextProps.profile.userDetails; 
      
    }

    if (Object.keys(nextProps.errors).length!=0) {
      this.setState({
        errors: nextProps.errors
      });
      
      document.getElementById('profile-user-msg-box').style.display="block";
                     document.getElementById('profile-user-msg-box').className = 'alert-danger';
                     document.getElementById('profile-user-msg-box').innerHTML    = nextProps.errors.message;
    }
    else{
      document.getElementById('profile-user-msg-box').style.display="none";
    }


    if (nextProps.success) {
      this.setState({
        success: nextProps.success
      });

      if(Object.keys(nextProps.success).length!=0)
      {
        document.getElementById('profile-user-msg-box').style.display="block";
        document.getElementById('profile-user-msg-box').className = 'alert-success';
        document.getElementById('profile-user-msg-box').innerHTML = nextProps.success.message;

      }


  }

  }

  render() { console.log("Hi",API_URL);
    //const { errors } = this.state;
    const { userDetails } = this.props.profile;
    const { user } = this.props.auth;
    console.log("User Details", userDetails);
    console.log("User", user);
    
    let skillItems;
    if((this.props.skills).hasOwnProperty('result')){
      
      skillItems = this.props.skills.result.map((item,index)=>(
      <tr key ={item.id} id={"skill-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.name}</td>
      </tr>
   ));
  
  }

  let disabilityItems;
    if((this.props.disabilities).hasOwnProperty('result')){
      
      disabilityItems = this.props.disabilities.result.map((item,index)=>(
      <tr key ={item.id} id={"disability-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.name}</td>
      </tr>
   ));
  
  }

  let qualificationItems;
    if((this.props.qualifications).hasOwnProperty('result')){
      
      qualificationItems = this.props.qualifications.result.map((item,index)=>(
      <tr key ={item.id} id={"qualification-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.university_name}</td>
          <td>{item.degree_level}</td>
          <td>{item.qualification_name}</td>
          <td>{item.start_dt}</td>
          <td>{item.completion_dt}</td>
      </tr>
   ));
  
  }

  let employmentItems;
    if((this.props.employments).hasOwnProperty('result')){
      
      employmentItems = this.props.employments.result.map((item,index)=>(
      <tr key ={item.id} id={"employment-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.orgn_name}</td>
          <td>{item.designation}</td>
          <td>{item.from_period}</td>
          <td>{item.to_period}</td>

          <td><Link to={{pathname:"/editEmployment",employmentId:item.id}} ><button className="btn btn-sm btn-primary edit">Edit</button></Link>&nbsp;
          </td>
      </tr>
   ));
  
  }


    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="profile-user-msg-box" style={{display:'none'}}></h5>
           
              <div className="row">
                
                      <div className ="col-md-12 bg-white p-3 border">
                        
                          <h5 className="p-2 text-center font-weight-bold">Resume</h5>

                                <div className="row">
                                   <div className="col-md-6">
                                       <table className="table">
                                           <tbody>
                                               <tr>
                                                  <th>
                                                     First Name
                                                  </th>
                                                  <td>
                                                     {
                                                       typeof userDetails != "undefined" &&
                                                                       userDetails.first_name
                                                      }
                                                  </td>    
                                               </tr>
                                               <tr>
                                                  <th>
                                                     Last Name
                                                  </th>
                                                  <td>
                                                    {  typeof userDetails != "undefined" &&
                                                                       userDetails.last_name
                                                    }                  
                                                  </td>    
                                               </tr>
                                               <tr>
                                                  <th>
                                                     Email
                                                  </th>
                                                  <td>
                                                    {  typeof userDetails != "undefined" &&
                                                                       userDetails.email
                                                    }  
                                                  </td>    
                                               </tr>
                                               <tr>
                                                  <th>
                                                     Phone Number
                                                  </th>
                                                  <td>
                                                     {  typeof userDetails != "undefined" &&
                                                                       userDetails.phone_num
                                                    }  
                                                  </td>    
                                               </tr>
                                               <tr>
                                                  <th>
                                                     Address
                                                  </th>
                                                  <td>
                                                  {  typeof userDetails != "undefined" &&
                                                                       userDetails.address
                                                    }  
                                                  </td>    
                                               </tr>
                                           </tbody>  
                                       </table>  
                                   </div>
                                   
                                        <div className="col-md-6">
                                                { 
                                                  typeof userDetails != "undefined" &&
                                                  <center><img className="card-img-top" src= 
                                                                                    {
                                                                                      userDetails.profile_img_file_name ? `${API_URL}/profileImages/${userDetails.profile_img_file_name}` :'images/dummy_pic.png'
                                                                                     } alt="Card image cap" style={{width:"40%"}}/>
                                                  </center>                                   
                                              }
                                        </div>
                                   
                                </div> 

                                <div className="row">
                                    <div className="col-md-12">
                                            <h5 className="p-2 font-weight-bold">Skills</h5>
                                                  <div className="row">
                                                        <div className="col-md-12">
                                                                  <table className="table table-bordered table-striped">
                                                                      <thead>
                                                                           <tr className="text-muted text-center">
                                                                               <th>S.No.</th>
                                                                               <th>Skill Name</th>
                                                                           </tr>  
                                                                      </thead>
                                                                      <tbody className="text-center">
                                                                          {skillItems}
                                                                      </tbody>  
                                                                   </table>     
                                                        </div>  
                                                  </div>  
                                    </div>  
                                </div>  
                                
                                <div className="row">
                                    <div className="col-md-12">
                                            <h5 className="p-2 font-weight-bold">Disabilities</h5>
                                                  <div className="row">
                                                        <div className="col-md-12">
                                                                  <table className="table table-bordered table-striped">
                                                                      <thead>
                                                                           <tr className="text-muted text-center">
                                                                               <th scope="col">S.No.</th>
                                                                               <th scope="col">Disability Name</th>
                                                                           </tr>  
                                                                      </thead>
                                                                      <tbody className="text-center">
                                                                          {disabilityItems}
                                                                      </tbody>  
                                                                   </table>     
                                                        </div>  
                                                  </div>  
                                    </div>  
                                </div> 

                                <div className="row">
                                    <div className="col-md-12">
                                            <h5 className="p-2 font-weight-bold">Qualifications</h5>
                                                  <div className="row">
                                                        <div className="col-md-12 table-responsive">
                                                                  <table className="table table-bordered table-striped">
                                                                      <thead className="text-center">
                                                                      <tr>
                                                                          <th scope="col">S.No.</th>
                                                                          <th scope="col">University</th>
                                                                          <th scope="col">Degree Level</th>
                                                                          <th scope="col">Qualification</th>
                                                                          <th scope="col">Start Date</th>
                                                                          <th scope="col">End Date</th>
                                                                        </tr>
                                                                      </thead>
                                                                      <tbody className="text-center">
                                                                          {qualificationItems}
                                                                      </tbody>  
                                                                   </table>     
                                                        </div>  
                                                  </div>  
                                    </div>  
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                            <h5 className="p-2 font-weight-bold">Employment Details</h5>
                                                  <div className="row">
                                                        <div className="col-md-12 table-responsive">
                                                                  <table className="table table-bordered table-striped">
                                                                      <thead>
                                                                           <tr className="text-muted text-center">
                                                                          
                                                                                <th scope="col">S.No.</th>
                                                                                <th scope="col">Organisation Name</th>
                                                                                <th scope="col">Designation</th>
                                                                                <th scope="col">From Period</th>
                                                                                <th scope="col">To Period</th>
                                                                              
                                                                           </tr>  
                                                                      </thead>
                                                                      <tbody className="text-center">
                                                                          {employmentItems}
                                                                      </tbody>  
                                                                   </table>     
                                                        </div>  
                                                  </div>  
                                    </div>  
                                </div>


                      </div>
                
                </div>
            </div>
        </div>
      </div>
    );
  }
}

MyResume.propTypes = {
  userProfile: PropTypes.func.isRequired,
  getAllDisabilities: PropTypes.func.isRequired,
  getAllSkills      : PropTypes.func.isRequired,
  getAllQualifications      : PropTypes.func.isRequired,
  getAllEmploymentDetails   : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile:state.profile,
  skills : state.skills,
  disabilities : state.disabilities,
  qualifications : state.qualifications,
  employments : state.employments,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ userProfile,getAllDisabilities,getAllSkills,getAllQualifications,getAllEmploymentDetails })(withRouter(MyResume));