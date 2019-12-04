import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

var __html = require('./template.js');
var template = { __html: __html };

class Landing extends Component {

  componentDidMount(){
    if (this.props.auth.isAuthenticated) {

      if(this.props.auth.user.type_of_user=='user')
           this.props.history.push("/dashboard");
      else
           this.props.history.push("/dashboardEmployer"); 
    }
  }
  

  componentWillReceiveProps(nextProps){

    if (nextProps.auth.isAuthenticated) {

      if(nextProps.auth.user.type_of_user=='user')
            nextProps.history.push("/dashboard");
      else
            nextProps.history.push("/dashboardEmployer"); 
    }

  }

  render() {
    return (
      <div className="screen-share">
      <span dangerouslySetInnerHTML={template} />
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