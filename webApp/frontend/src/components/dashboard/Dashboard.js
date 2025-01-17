import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getAllOpeningsCount, getMyActiveApplicationsCount,getAllRecommendedJobs} from "../../actions/openingActions";
import './Dashboard.scss';

class Dashboard extends Component {

  componentWillMount(){

    this.props.getAllOpeningsCount();
    this.props.getMyActiveApplicationsCount();
    this.props.getAllRecommendedJobs();
  }

    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };
    
    render() {
      const { user } = this.props.auth;

      let openingsCount =0;
      openingsCount = this.props.openingsCount.result;

      let myActiveApplicationsCount = 0;
               myActiveApplicationsCount = this.props.myActiveApplicationsCount.result;

      let recommendedJobsCount = 0;
               recommendedJobsCount = this.props.recommendedJobs.resultSize;         

      
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
                                     <h3>{myActiveApplicationsCount}</h3>
                                    <h4>My Active Applications</h4>
                              </div>
                              <div class="icon">
                                    <i class="fa fa-envelope-o"></i>
                              </div>
                            <a class="small-box-footer" href="/myActiveApplications">More info<i class="fa fa-arrow-circle-right"></i></a> 
                        </div>
                </div>

                <div class="col-lg-4 col-xs-12">
                  
                        <div class="small-box bg-warning">
                              <div class="inner text-white">
                                 <h3>{openingsCount}</h3>
                                    <h4>Current Openings(In -house)</h4>
                              </div>
                              <div class="icon">
                                    <i class="fa fa-tachometer"></i>
                              </div>
                            <a class="small-box-footer" href="allOpenings">More info<i class="fa fa-arrow-circle-right"></i></a> 
                        </div>
                </div>

                <div class="col-lg-4 col-xs-12">
                  
                  <div class="small-box bg-danger">
                        <div class="inner text-white">
                           <h3>{recommendedJobsCount}</h3>
                              <h4>Recommended Openings</h4>
                        </div>
                        <div class="icon">
                              <i class="fa fa-tachometer"></i>
                        </div>
                      <a class="small-box-footer" href="allRecommendedJobs">More info<i class="fa fa-arrow-circle-right"></i></a> 
                  </div>
               </div>

          </div>


        </div>
      );
    }
  }
  
  Dashboard.propTypes = {
    getAllOpeningsCount : PropTypes.func.isRequired,
    getMyActiveApplicationsCount :  PropTypes.func.isRequired,
    getAllRecommendedJobs        :  PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    openingsCount:state.openingsCount,
    myActiveApplicationsCount : state.myActiveApplicationsCount,
    recommendedJobs : state.recommendedJobs
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser,getAllOpeningsCount, getMyActiveApplicationsCount, getAllRecommendedJobs}
  )(Dashboard);