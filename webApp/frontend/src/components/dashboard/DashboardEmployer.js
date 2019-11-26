import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAllMyOpeningsCount,getAllMyClosedOpeningsCount,getUserApplicationsCount } from "../../actions/openingActions";
import './Dashboard.scss';

class DashboardEmployer extends Component {

  constructor() {
    super();
    this.state = {
      openings : 0,
      errors: {},
      success:{}
    };
  }

  componentWillMount(){
    this.props.getAllMyOpeningsCount();
    this.props.getAllMyClosedOpeningsCount();
    this.props.getUserApplicationsCount();
 }


    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };
    
    render() {

      const { user } = this.props.auth;
      //const { result } = this.props.openings;
      let openingsCount =0;
      openingsCount = this.props.openingsCount.result;

      let closedOpeningsCount =0;
      closedOpeningsCount = this.props.closedOpeningsCount.result;

      let userApplicationsCount =0;
      userApplicationsCount = this.props.userApplicationsCount.result;

      return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row mt-6">
            <div className="col-12 s12 center-align">
              <h4>
                <b>Hey there,</b> { user.first_name}
                
              </h4>
              
            </div>
          </div>

          <div className="row mt-6">
               
                  <div class="col-lg-4 col-xs-12">
                  
                        <div class="small-box bg-success">
                              <div class="inner text-white">
                                     <h3>{openingsCount}</h3>
                                    <h4>My Current Openings</h4>
                              </div>
                              <div class="icon">
                                    <i class="fa fa-envelope-o"></i>
                              </div>
                            <a class="small-box-footer" href="/myAllOpenings">More info<i class="fa fa-arrow-circle-right"></i></a> 
                        </div>
                </div>

                <div class="col-lg-4 col-xs-12">
                  
                        <div class="small-box bg-warning">
                              <div class="inner text-white">
                                    <h3>{userApplicationsCount}</h3>
                                    <h4>User Applications</h4>
                              </div>
                              <div class="icon">
                                    <i class="fa fa-tachometer"></i>
                              </div>
                            <a class="small-box-footer" href="/userApplications">More info<i class="fa fa-arrow-circle-right"></i></a> 
                        </div>
                </div>

                <div class="col-lg-4 col-xs-12">
                        <div class="small-box bg-info">
                              <div class="inner text-white">
                                    <h3>{closedOpeningsCount}</h3>
                                    <h4>Archived Applications</h4>
                              </div>
                              <div class="icon">
                                    <i class="fa fa-tachometer"></i>
                              </div>
                            <a class="small-box-footer" href="allArchivedOpenings">More info<i class="fa fa-arrow-circle-right"></i></a> 
                        </div>
                </div> 


          </div>


        </div>
      );
    }
  }
  
  DashboardEmployer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getAllMyOpeningsCount: PropTypes.func.isRequired,
    getAllMyClosedOpeningsCount: PropTypes.func.isRequired,
    getUserApplicationsCount : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    openingsCount:state.openingsCount,
    closedOpeningsCount : state.closedOpeningsCount,
    userApplicationsCount : state.userApplicationsCount
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser,getAllMyOpeningsCount,getAllMyClosedOpeningsCount,getUserApplicationsCount }
  )(DashboardEmployer);