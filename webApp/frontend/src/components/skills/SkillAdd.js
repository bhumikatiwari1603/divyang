import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSkill } from "../../actions/skillActions";
import classnames from "classnames";

class SkillAdd extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
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
    
    const skillDetails = {
      name: this.state.name
    };


    this.props.addSkill(skillDetails, this.props.history); 
  
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
                <div className ="col-md-5 mx-auto bg-white p-3 border">
                    
                  <h5 className="p-2 text-center font-weight-bold">Skill</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <div className="row">
                              <div className="col-md-12">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        placeholder="Skill Name"
                                        pattern="^[a-zA-Z\s]+$"
                                        required
                                        minLength="1"
                                        maxLength="10"
                                        className={classnames("form-control", {
                                          invalid: errors.name
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
                              Add Skill
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

SkillAdd.propTypes = {
  addSkill: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ addSkill })(withRouter(SkillAdd));