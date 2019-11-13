import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      success: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    //console.log("Component Mounted..");
    //console.log("Props",this.props);
    
    if(Object.keys(this.props.success).length!=0){
      
      document.getElementById('login-msg-box').style.display = "block";
      document.getElementById('login-msg-box').className = 'alert-success';
      document.getElementById('login-msg-box').innerHTML = this.props.success.message;
    }
    else{
      document.getElementById('login-msg-box').style.display="none";
    }

    if (this.props.auth.isAuthenticated) {
       
      if(this.props.auth.user.type_of_user=='owner')
           this.props.history.push("/dashboard");
      else
           this.props.history.push("/dashboardBuyer");    
    }
    
  }
  
  componentWillReceiveProps(nextProps) {
  
    if (nextProps.auth.isAuthenticated) {

      if(nextProps.auth.user.type_of_user=='owner')
           nextProps.history.push("/dashboard");
      else
           nextProps.history.push("/dashboardBuyer");
    
    }

    if (Object.keys(nextProps.errors).length!=0) {
      this.setState({
        errors: nextProps.errors
      });
      document.getElementById('login-msg-box').style.display="block";
      document.getElementById('login-msg-box').className = 'alert-danger';
      document.getElementById('login-msg-box').innerHTML    = nextProps.errors.message;
    }

    if (nextProps.success) {
        this.setState({
          success: nextProps.success
        });

        if(Object.keys(nextProps.success).length!=0)
        {
          document.getElementById('login-msg-box').style.display="block";
          document.getElementById('login-msg-box').className = 'alert-success';
          document.getElementById('login-msg-box').innerHTML    = nextProps.success.message;
        }
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    document.getElementById('login-msg-box').style.display="none";
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    //this.setState({errors:"",success:""});
    //return false;
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    
    
    this.props.loginUser(userData);
  };
  
  
  render() {
    const { errors} = this.state;
    
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
                <h5 className="p-2" id="login-msg-box" style={{display:'none'}}></h5>  
                  <h5 className="p-2 font-weight-bold text-center text-secondary">Sign in</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          
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
                                        minLength="1"
                                        maxLength="30"
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
                              <span>
                              <b>Sign In</b></span>
                            </button>
                          </div> 
                      </div>
                    </form>
                    <div className="row">
                        <div className="col-md-12 text-center p-2">
                            <p className="text-center"><Link to="register">Create your account</Link></p>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success
});

export default connect(mapStateToProps,{ loginUser })(Login);