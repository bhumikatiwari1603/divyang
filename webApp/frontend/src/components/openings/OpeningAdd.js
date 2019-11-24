import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addOpening } from "../../actions/openingActions";
import classnames from "classnames";

class OpeningAdd extends Component {
  constructor() {
    super();
    this.state = {
      job_title: "",
      job_descr: "",
      job_location: "",
      skills_required: "",
      closing_dt: "",
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
    
    const openingDetails = {
      job_title: this.state.job_title,
      job_descr: this.state.job_descr,
      job_location: this.state.job_location,
      skills_required: this.state.skills_required,
      closing_dt: this.state.closing_dt,
    };


    this.props.addOpening(openingDetails, this.props.history); 
  
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
                    
                  <h5 className="p-2 text-center font-weight-bold">Job Opening</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <div className="row">
                              <div className="col-md-4">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Job Title</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.job_title}
                                        error={errors.job_title}
                                        id="job_title"
                                        type="text"
                                        placeholder="Job Title"
                                        pattern="^[a-zA-Z\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="30"
                                        className={classnames("form-control", {
                                          invalid: errors.job_title
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Job Location</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.job_location}
                                        error={errors.job_location}
                                        id="job_location"
                                        type="text"
                                        placeholder="Job Location"
                                        pattern="^[a-zA-Z0-9\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="10"
                                        className={classnames("form-control", {
                                          invalid: errors.job_location
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-4">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Closing Date</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.closing_dt}
                                        error={errors.closing_dt}
                                        id="closing_dt"
                                        type="date"
                                        placeholder="From Period"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.closing_dt
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Job Description</span>
							                       </div>
                                      <textarea
                                        onChange={this.onChange}
                                        value={this.state.job_descr}
                                        error={errors.job_descr}
                                        id="job_descr"
                                        type="text"
                                        placeholder="Job Description"
                                        pattern="^[a-zA-Z0-9\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="50"
                                        className={classnames("form-control", {
                                          invalid: errors.job_descr
                                        })}
                                      />
                                    </div>
                                  </div> 
                                 
                                  

                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Skills Required</span>
							                       </div>
                                      <textarea
                                        onChange={this.onChange}
                                        value={this.state.skills_required}
                                        error={errors.skills_required}
                                        id="skills_required"
                                        type="text"
                                        placeholder="Skills Required"
                                        pattern="^[a-zA-Z0-9\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="50"
                                        className={classnames("form-control", {
                                          invalid: errors.skills_required
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
                              Add Job Opening
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

OpeningAdd.propTypes = {
  addOpening: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ addOpening })(withRouter(OpeningAdd));