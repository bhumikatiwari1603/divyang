import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addQualification } from "../../actions/qualificationActions";
import classnames from "classnames";

class QualificationAdd extends Component {
  constructor() {
    super();
    this.state = {
      university_name: "",
      degree_level : "",
      qualification_name:"",
      start_dt: "",
      completion_dt:"",
      errors: {},
      success:{}
    };
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
    else{
      document.getElementById('msg-box').style.display="none";
    }

  }

  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
  
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const qualificationDetails = {
      university_name : this.state.university_name,
      degree_level    : this.state.degree_level,
      qualification_name : this.state.qualification_name,
      start_dt           : this.state.start_dt,
      completion_dt      : this.state.completion_dt

    };


    this.props.addQualification(qualificationDetails, this.props.history); 
  
  };

 
  render() {
    const { errors } = this.state;
    //const {userDetails} = this.state; 
    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
           {/* <div className="row p-2">
              <div className ="col-md-12 bg-white">
                   <h5 className="text-center" id="output" style={"display:none"}></h5>
              </div>
				   </div> */}
                <div className="row">
                <div className ="col-md-8 mx-auto bg-white p-3 border">
                    
                  <h5 className="p-2 text-center font-weight-bold">Qualification</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <div className="row">
                              <div className="col-md-12">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">University Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.university_name}
                                        error={errors.university_name}
                                        id="university_name"
                                        type="text"
                                        placeholder="University Name"
                                        pattern="^[a-zA-Z\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="20"
                                        className={classnames("form-control", {
                                          invalid: errors.name
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Degree Level</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.degree_level}
                                        error={errors.degree_level}
                                        id="degree_level"
                                        type="text"
                                        placeholder="Degree Level"
                                        pattern="^[a-zA-Z\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="20"
                                        className={classnames("form-control", {
                                          invalid: errors.degree_level
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Qualification Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.qualification_name}
                                        error={errors.qualification_name}
                                        id="qualification_name"
                                        type="text"
                                        placeholder="Qualification Name"
                                        pattern="^[a-zA-Z\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="20"
                                        className={classnames("form-control", {
                                          invalid: errors.qualification_name
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Start Date</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.start_dt}
                                        error={errors.start_dt}
                                        id="start_dt"
                                        type="date"
                                        placeholder="Start Date"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.start_dt
                                        })}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Completion Date</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.completion_dt}
                                        error={errors.completion_dt}
                                        id="completion_dt"
                                        type="date"
                                        placeholder="Completion Date"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.completion_dt
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
                              Add Qualification
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

QualificationAdd.propTypes = {
  addQualification: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ addQualification })(withRouter(QualificationAdd));