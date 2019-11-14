import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {

  constructor(){
    super();
    this.state = {
    
     }

  }

 
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

 
  render() {
    const { user } = this.props.auth;
    
    return (
            
              <nav className="navbar navbar-expand-lg navbar-dark bg-white border">
                <a href="/login"> <h3 className="font-weight-bold text-secondary text-muted font-italic"> divyang</h3></a>
                  {Object.keys(user).length!=0 &&
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                            <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                      {user.type_of_user=='employer' &&
                                        <Link className="nav-link text-dark" to="dashboardEmployer">Home <span className="sr-only">(current)</span></Link>
                                      }
                                      {user.type_of_user=='user' &&
                                        <Link className="nav-link text-dark" to="dashboard">Home <span className="sr-only">(current)</span></Link>
                                      }  
                                    </li>
                                  <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-secondary" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      Hi,{user.first_name}!
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                      {user.type_of_user=='user' &&
                                         <a className="dropdown-item" href="profileUser">Profile</a>
                                      }
                                      {user.type_of_user=='employer' &&
                                         <a className="dropdown-item" href="/profileEmployer">Profile</a>
                                      }   
                                      <div className="dropdown-divider"></div>
                                      <a className="dropdown-item" href="#" onClick={this.onLogoutClick} >Logout</a>
                                    </div>
                                  </li>

                            </ul>
                  </div>
                  }           
                
        </nav>
        
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(Navbar);