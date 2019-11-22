import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEmploymentDetail } from "../../actions/employmentActions";
import classnames from "classnames";

class EmploymentAdd extends Component {
  constructor() {
    super();
    this.state = {
      orgn_name: "",
      designation: "",
      from_period : "",
      to_period: "",
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
    
    const employmentDetails = {
      orgn_name : this.state.orgn_name,
      designation : this.state.designation,
      from_period : this.state.from_period,
      to_period : this.state.to_period
   
    };


    this.props.addEmploymentDetail(employmentDetails, this.props.history); 
  
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
                    
                  <h5 className="p-2 text-center font-weight-bold">Employment Details</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <div className="row">
                              <div className="col-md-12">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Organisation Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.orgn_name}
                                        error={errors.orgn_name}
                                        id="name"
                                        type="text"
                                        placeholder="Organisation Name"
                                        pattern="^[a-zA-Z]+$"
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
								                         <span className="text-light-black">Designation</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.designation}
                                        error={errors.designation}
                                        id="designation"
                                        type="text"
                                        placeholder="Designation"
                                        pattern="^[a-zA-Z]+$"
                                        required
                                        minLength="1"
                                        maxLength="20"
                                        className={classnames("form-control", {
                                          invalid: errors.designation
                                        })}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">From Period</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.from_period}
                                        error={errors.from_period}
                                        id="from_period"
                                        type="date"
                                        placeholder="From Period"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.from_period
                                        })}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">To Period</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.to_period}
                                        error={errors.to_period}
                                        id="to_period"
                                        type="date"
                                        placeholder="To Period"
                                        required
                                        className={classnames("form-control", {
                                          invalid: errors.to_period
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
                              Add Employment
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

EmploymentAdd.propTypes = {
  addEmploymentDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ addEmploymentDetail })(withRouter(EmploymentAdd));