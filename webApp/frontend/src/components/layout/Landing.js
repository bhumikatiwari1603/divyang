import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Landing extends Component {

  componentDidMount(){
    if (this.props.auth.isAuthenticated) {

      if(this.props.auth.user.type_of_user=='owner')
           this.props.history.push("/dashboard");
      else
           this.props.history.push("/dashboardRecruiter"); 
    }
  }
  

  componentWillReceiveProps(nextProps){

    if (nextProps.auth.isAuthenticated) {

      if(nextProps.auth.user.type_of_user=='user')
            nextProps.history.push("/dashboard");
      else
            nextProps.history.push("/dashboardRecruiter"); 
    }

  }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              {/* <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch */}
              Landing Page
            </h4>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);