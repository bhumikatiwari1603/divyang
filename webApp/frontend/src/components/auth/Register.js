import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      type_of_user : "user",
      errors: {}
    };
  }
  

  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
      
      document.getElementById('register-msg-box').style.display="block";
                     document.getElementById('register-msg-box').className = 'alert-danger';
                     document.getElementById('register-msg-box').innerHTML    = nextProps.errors.message;
    }
    else{
      document.getElementById('register-msg-box').style.display="none";
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {

          if(this.props.auth.user.type_of_user=='owner')
               this.props.history.push("/dashboard");
         else
           this.props.history.push("/dashboardBuyer"); 
    
     }
  }
  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
    document.getElementById('register-msg-box').style.display="none";
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      type_of_user: this.state.type_of_user
    };
    console.log(newUser);

    this.props.registerUser(newUser, this.props.history); 
  
  };
  
  

  render() {
    const { errors } = this.state;
    
    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">

           {/* <div className="row p-2">
              <div className ="col-md-12 bg-white">
                   <h5 className="text-center" id="output" style={"display:none"}></h5>
              </div>
				   </div> */}
                <div className="row">
                <div className ="col-md-4 mx-auto bg-white p-3 border">
                  <h5 className="p-2" id="register-msg-box" style={{display:'none'}}></h5>  
                  <h5 className="p-2">Create your account</h5>
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
                                        pattern="^[a-zA-Z]+$"
                                        minLength="1"
                                        maxLength="10"
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
                                          pattern="^[a-zA-Z]+$"
                                          minLength="1"
                                          maxLength="10"
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
                                        minLength="1"
                                        maxLength="30"
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
								                         <span className="text-light-black">Password</span>
							                        </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        pattern="^[a-zA-Z]+$"
                                        minLength="1"
                                        maxLength="5"
                                        className={classnames("form-control", {
                                          invalid: errors.password
                                        })}
                                      />
                                      {/* <span className="form-group has-feedback" htmlFor="password">Password</span>
                                      <span className="red-text">{errors.password}</span> */}
                                    </div>
                                  </div> 
                                </div>   
                      
                      <div className="row">
                        <div className="col-md-12 text-center p-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-flat"
                            >
                              Create your account
                            </button>
                          </div> 
                      </div>
                    </form>
                    <div className="row">
                        <div className="col-md-12 text-center p-2">
                            <p>Register as a Recruiter? <Link to="registerEmployer">Click Here</Link></p>
                            <p>Have an account? <Link to="login">Sign In</Link></p>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));