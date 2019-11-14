import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userProfile,userProfileUpdation,userProfilePicUpload } from "../../actions/profileActions";
import classnames from "classnames";
import {API_URL} from "../../actions/url";

class ProfileUser extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      profile_img_file_name:"",
      phone_num: "",
      selected_file : "",
      address:"",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.userProfile();
    //console.log("User Details",this.props.profile);
}

  componentWillReceiveProps(nextProps) {
     //console.log("New Props..",nextProps);

     if (Object.keys(nextProps.profile).length!=0) {
       const userDetails = nextProps.profile.userDetails; 
      this.setState({
              first_name: userDetails.first_name,
              last_name: userDetails.last_name,
              email: userDetails.email,
              profile_img_file_name: userDetails.profile_img_file_name,
              phone_num: userDetails.phone_num, 
              address : userDetails.address,
      });
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

        if((nextProps.success).hasOwnProperty('profileImageName')){
                      this.setState({
                        profile_img_file_name: nextProps.success.profileImageName,
                        selected_file : "",
                      })

                      document.getElementById('profileImageLabel').innerHTML = "Choose file";
                      
        }
        

      }


  }

  }

  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
    
    if(e.target.files!=null){

      document.getElementById('profile-user-msg-box').style.display="none";
      let img = document.getElementById('profileImagePath').value.split("\\").pop();
      document.getElementById('profileImageLabel').innerHTML = img;
           
       this.setState({selected_file:e.target.files[0]});
    }

  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const userProfileDetails = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      profile_img_file_name: this.state.profile_img_file_name,
      phone_num: this.state.phone_num,
      address  : this.state.address
    };

    /*this.setState({
      success:"",
      errors:{}
    });*/
    

    this.props.userProfileUpdation(userProfileDetails, this.props.history); 
  
  };

  onUploadProfilePic = e => {
    e.preventDefault();

    const formData = new FormData();
    
      formData.append('file', this.state.profileImage);
      
      formData.append('profileImage', this.state.selected_file);
      
     /*const profilePicDetails = {
           profileImage:this.state.profileImage
     };*/
    this.props.userProfilePicUpload(formData, this.props.history);
  }
  
  

  render() { console.log("Hi",API_URL);
    const { errors } = this.state;
    //const {userDetails} = this.state; 
    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="profile-user-msg-box" style={{display:'none'}}></h5>
           
              <div className="row">
                <div className ="col-md-5 mx-auto bg-white p-3 border">
                    
                  <h5 className="p-2 text-center font-weight-bold">Profile</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <div className="row">
                              <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">First Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.first_name}
                                        error={errors.first_name}
                                        id="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.first_name
                                        })}
                                      />
                                      {/* <span className="glyphicon glyphicon-envelope form-control" htmlFor="name">First Name</span>
                                      <span className="red-text">{errors.first_name}</span> */}
                                    </div>
                                  </div> 
                                  <div className="col-md-6">
                                      <div>
								                         <span className="text-light-black">Last Name</span>
							                        </div>
                                      <div className="form-group">
                                        <input
                                          onChange={this.onChange}
                                          value={this.state.last_name}
                                          error={errors.last_name}
                                          id="last_name"
                                          type="text"
                                          placeholder="Last Name"
                                          required
                                          className={classnames("form-control", {
                                            invalid: errors.last_name
                                          })}
                                        />
                                      {/*  <span  className="form-control" htmlFor="last-name">Last Name</span>
                                        <span className="red-text">{errors.last_name}</span> */}
                                      </div>
                                </div>
                            </div>

                              <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Email</span>
							                        </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}
                                        id="email"
                                        type="email"
                                        placeholder = "Email"
                                        email="true"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.email
                                        })}
                                      />
                                      {/* <span className="form-group has-feedback" htmlFor="email">Email</span>
                                      <span className="red-text">{errors.email}</span> */}
                                    </div>
                                  </div>
                                </div> 

                              <div className="row">
                                <div className="col-md-12">   
                                    <div className="form-group has-feedback">
                                      <div>
								                         <span className="text-light-black">Phone Number</span>
							                        </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.phone_num}
                                        error={errors.phone_num}
                                        id="phone_num"
                                        type="phone_num"
                                        placeholder="Phone Number"
                                        required
                                        pattern="^[0-9]+$"
                                        minLength="1"
                                        maxLength="10"
                                        className={classnames("form-control", {
                                          invalid: errors.phone_num
                                        })}
                                      />
                                      
                                    </div>
                                  </div> 
                                </div>   
                      
                      <div className="row">
                        <div className="col-md-12 text-center p-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-flat"
                            >
                              Update Profile
                            </button>
                          </div> 
                      </div>
                    </form>
                    </div>


              <div className ="col-md-5 bg-white p-3 border">
                  <h5 className="p-2" id="profile-user-msg-box" style={{display:'none'}}></h5>  
                  <h5 className="p-2 text-center font-weight-bold">Profile Image</h5>
                        
                          <div className="row">
                               <div className="col-md-6 mx-auto">
                                  { <img className="card-img-top" src=  {this.state.profile_img_file_name ? `${API_URL}/profileImages/${this.state.profile_img_file_name}` :'images/dummy_pic.png'} alt="Card image cap"/>}
                               </div> 
                            </div>
                            <div className="row">
                               <div className="col-md-6 m-auto">
                                   <h5 className="text-center"><u>{this.state.profile_img_file_name ? this.state.first_name+this.state.last_name :'Dummy Pic'}</u></h5>
                               </div>
                            </div>
                            <form onSubmit={this.onUploadProfilePic}>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="custom-file">
                                        <input type="file" className="custom-file-input" name="profileImagePath" id="profileImagePath" onChange={this.onChange} value={this.state.profileImagePath}
                                          error={errors.profileImage} required/>
                                        <label className="custom-file-label" id="profileImageLabel">Choose file</label>
                                </div>
                              </div>
                            </div>
                            

                      <div className="row">
                        <div className="col-md-12 text-center p-2">
                            <button
                              type="submit"
                              className="btn btn-info btn-flat"
                            >
                              Upload Profile Pic
                            </button>
                          </div> 
                      </div>
                      </form>
                    </div>
                
                </div>
            </div>
        </div>
      </div>
    );
  }
}

ProfileUser.propTypes = {
  userProfile: PropTypes.func.isRequired,
  userProfileUpdation:PropTypes.func.isRequired,
  userProfilePicUpload:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile:state.profile,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ userProfile,userProfileUpdation,userProfilePicUpload })(withRouter(ProfileUser));