import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllMyClosedOpenings} from "../../actions/openingActions";

class ArchivedOpeningView extends Component {
  constructor() {
    super();
    this.state = {
      openingId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getAllMyClosedOpenings();
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
    else if(Object.keys(nextProps.success).length!=0){
      this.setState({
        success: nextProps.success
      });
      
      document.getElementById('msg-box').style.display="block";
                     document.getElementById('msg-box').className = 'alert-success';
                     document.getElementById('msg-box').innerHTML    = nextProps.success.message;
    }
    else{
      document.getElementById('msg-box').style.display="none";
    }


  }

  render() {
    const { errors } = this.state;
    let openingItems;
    if((this.props.closedOpenings).hasOwnProperty('result')){
      
      openingItems = this.props.closedOpenings.result.map((item,index)=>(
      <tr key ={item.id} id={"opening-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.job_title}</td>
          <td>{item.job_descr}</td>
          <td>{item.job_location}</td>
          <td>{item.skills_required}</td>
          <td>{item.closing_dt}</td>
      </tr>
   ));
  
  }

    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
                <div className="row">
                  
                     <div className ="col-md-8 mx-auto bg-white p-3 border">
                     <h5 className="p-2 font-weight-bold text-primary">Archived Job Openings</h5>
                           <div className="table-responsive">
                               <table className="table table-bordered text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Job Title</th>
                                        <th scope="col">Job Description</th>
                                        <th scope="col">Job Location</th>
                                        <th scope="col">Skills Required</th>
                                        <th scope="col">Closing Date</th>
                                      </tr>
                                    </thead>
                                    <tbody id="openings-list">
                                        {openingItems}
                                          
                                    </tbody>      
                               </table>
                           </div>
                    </div>                
                </div>
            </div>
        </div>
      </div>
    );
  }
}

ArchivedOpeningView.propTypes = {
  getAllMyClosedOpenings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  closedOpenings:state.closedOpenings
});

export default connect(mapStateToProps,{ getAllMyClosedOpenings })(withRouter(ArchivedOpeningView));