import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserApplications} from "../../actions/openingActions";
import {API_URL} from "../../actions/url";

class UserApplications extends Component {
  constructor() {
    super();
    this.state = {
      openingId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getUserApplications();
 }


  componentWillReceiveProps(nextProps) {
  
    if (Object.keys(nextProps.errors).length!=0) {
      this.setState({
        errors: nextProps.errors
      });
      
      document.getElementById('msg-box').style.display="block";
                     document.getElementById('msg-box').className = 'alert-danger';
                     document.getElementById('msg-box').innerHTML    = nextProps.errors.message;
    }
    else if(Object.keys(nextProps.success).length!=0){
      this.setState({
        success: nextProps.success
      });
      
      document.getElementById('msg-box').style.display="block";
                     document.getElementById('msg-box').className = 'alert-success';
                     document.getElementById('msg-box').innerHTML    = nextProps.success.message;
    }
    else{
      document.getElementById('msg-box').style.display="none";
    }

  }

  onClick = e =>{
    e.preventDefault();

    this.setState({
      applicantDetails : e.target.getAttribute('applicantDetails'),
      openingId : e.target.getAttribute('openingId'),
      jobTitle : e.target.getAttribute('jobTitle')
    });


    

  }

  onModalClose = e =>{
    e.preventDefault();
    let applicantDetailsObj = JSON.parse(this.state.applicantDetails); 
    console.log("Applicant DEtails....",applicantDetailsObj)
    this.setState({
      applicantDetails:"",
      openingId : "",
      jobTitle : "" 
    })
  }

  render() {
    const { errors } = this.state;
    let userApplicationItems;
    if((this.props.userApplications).hasOwnProperty('result')){
      
      userApplicationItems = this.props.userApplications.result.map((item,index)=>{
      
          if(item.user_applications.length>0)
          {
            return item.user_applications.map((appl,i)=>(
                <tr key ={item.id} id={"opening-row-"+item.id}>
                    <td>{i+1}</td>
                    <td>{item.job_title}</td>
                    <td>{appl.user.first_name+" "+appl.user.last_name}</td>
                    <td>{appl.user.email}</td>
                      <td>
                         <button data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-success"  applicantDetails={JSON.stringify(appl)} openingId={item.id} jobTitle={item.job_title} onClick={this.onClick} id={"a-opening-id-"+item.id}>View Profile </button>
                     </td>
                </tr>
            ));

          }
    });
  
  }

    let applicantDetailsObj;
    let skillItems,disabilityItems,qualificationItems,employmentItems;
     if(this.state.applicantDetails)
      {
         
         applicantDetailsObj = JSON.parse(this.state.applicantDetails); 
          /*applicantDetail = applicantDetailsObj.order_details.map((item,index)=>{
          
         return (
                  <React.Fragment>
                             <tr>
                                <td className="text-center text-primary">{item.quantity}</td>
                                <td className="text-center">{item.name_of_item}</td>
                                <td className="text-center">${item.total_price}</td> 
                            </tr> 
                  </React.Fragment>  
               )
             }
           );*/

           
           if((applicantDetailsObj.user.user_skills).length>0){
             
             skillItems = applicantDetailsObj.user.user_skills.map((item,index)=>(
             <tr key ={item.id} id={"skill-row-"+item.id}>
                 <td>{index+1}</td>
                 <td>{item.name}</td>
             </tr>
          ));
         
         }

         
    if((applicantDetailsObj.user.user_disabilities).length>0){
      
      disabilityItems = applicantDetailsObj.user.user_disabilities.map((item,index)=>(
      <tr key ={item.id} id={"disability-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.name}</td>
      </tr>
   ));
  
  }

    if((applicantDetailsObj.user.user_qualifications).length>0){
      
      qualificationItems = applicantDetailsObj.user.user_qualifications.map((item,index)=>(
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

    /*if((applicantDetailsObj.user.user_employments).length>0){
      
      employmentItems = applicantDetailsObj.user.user_employments.map((item,index)=>(
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
  
  }*/
           
      }



    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
                <div className="row">
                  
                     <div className ="col-md-8 mx-auto bg-white p-3 border">
                     <h5 className="p-2 font-weight-bold text-primary">User Applications</h5>
                           <div className="table-responsive">
                               <table className="table table-bordered text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Job Title</th>
                                        <th scope="col">Applicant Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody id="openings-list">
                                       {userApplicationItems}                    
                                          
                                    </tbody>      
                               </table>
                           </div>
                    </div>                
                </div>


              <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title text-center" id="exampleModalLabel">Job Applied For : <b className="text-info">{this.state.jobTitle}</b></h5>
                                        <button type="button" className="close" data-dismiss="modal" onClick={this.onModalClose} aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                      
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
                                                                  typeof applicantDetailsObj != "undefined" &&
                                                                                  applicantDetailsObj.user.first_name
                                                                }
                                                            </td>    
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                              Last Name
                                                            </th>
                                                            <td>
                                                              {  typeof applicantDetailsObj != "undefined" &&
                                                                                applicantDetailsObj.user.last_name
                                                              }                  
                                                            </td>    
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                              Email
                                                            </th>
                                                            <td>
                                                              {  typeof applicantDetailsObj != "undefined" &&
                                                                                      applicantDetailsObj.user.email
                                                              }  
                                                            </td>    
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                              Phone Number
                                                            </th>
                                                            <td>
                                                              {  typeof applicantDetailsObj != "undefined" &&
                                                                                applicantDetailsObj.user.phone_num
                                                              }  
                                                            </td>    
                                                        </tr>
                                                        <tr>
                                                            <th>
                                                              Address
                                                            </th>
                                                            <td>
                                                            {  typeof applicantDetailsObj != "undefined" &&
                                                                                applicantDetailsObj.user.address
                                                              }  
                                                            </td>    
                                                        </tr>
                                                    </tbody>  
                                                </table>  
                                            </div>
                                        
                                            <div className="col-md-6">
                                                { 
                                                  typeof applicantDetailsObj != "undefined" &&
                                                  <center><img className="card-img-top" src= 
                                                                                    {
                                                                                      applicantDetailsObj.user.profile_img_file_name ? `${API_URL}/profileImages/${applicantDetailsObj.user.profile_img_file_name}` :'images/dummy_pic.png'
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
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.onModalClose} >Close</button>
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

UserApplications.propTypes = {
  getUserApplications : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  userApplications:state.userApplications
});

export default connect(mapStateToProps,{ getUserApplications })(withRouter(UserApplications));