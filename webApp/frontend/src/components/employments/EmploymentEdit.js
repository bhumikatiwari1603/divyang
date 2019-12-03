import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateEmploymentDetail} from "../../actions/employmentActions";
import classnames from "classnames";

class EmploymentEdit extends Component {
  constructor() {
    super();
    this.state = {
      orgn_name: "",
      designation : "",
      from_period: "",
      to_period:"",
      errors: {},
      success:{}
    };
  }

  componentDidMount(){
    
    let employmentId = this.props.location.employmentId; 
    if(typeof (employmentId) !='number')
     {
    
      this.props.history.push("/allEmployments");
     }


     if(this.props.employments.hasOwnProperty('result')){

      this.props.employments.result.map((item)=>{
      
        if(item.id==employmentId)
         {
           this.setState({
                orgn_name : item.orgn_name,
                id   : item.id,
                designation : item.designation,
                from_period : item.from_period,
                to_period : item.to_period
           });
           return;
         }
       
      });

     }

    
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
      id: this.state.id,
      orgn_name : this.state.orgn_name,
      designation    : this.state.designation,
      from_period : this.state.from_period,
      to_period   : this.state.to_period
    };

    this.props.updateEmploymentDetail(employmentDetails, this.props.history); 
  
  };

 
  render() {
    const { errors } = this.state;
    
    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
                <div className="row">
                <div className ="col-md-5 mx-auto bg-white p-3 border">
                    
                  <h5 className="p-2 font-weight-bold">Edit Employmment Details</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="row">
                              <div className="col-md-6">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Organisation Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.orgn_name}
                                        error={errors.orgn_name}
                                        id="orgn_name"
                                        type="text"
                                        placeholder="Organisation Name"
                                        pattern="^[a-zA-Z\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="20"
                                        className={classnames("form-control", {
                                          invalid: errors.orgn_name
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
                              Update Employmment
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

EmploymentEdit.propTypes = {
  updateEmploymentDetail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  employments:state.employments
});

export default connect(mapStateToProps,{ updateEmploymentDetail })(withRouter(EmploymentEdit,{id:Number}));