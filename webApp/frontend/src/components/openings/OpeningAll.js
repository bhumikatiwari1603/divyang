import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllOpenings,apply} from "../../actions/openingActions";

class OpeningAll extends Component {
  constructor() {
    super();
    this.state = {
      openingId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getAllOpenings();
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

    if (Object.keys(nextProps.appliedData).length!=0) {
      
      document.getElementById('msg-box').style.display="block";
      document.getElementById('msg-box').className = 'alert-success';
      document.getElementById('msg-box').innerHTML    = nextProps.appliedData.message;
      
      document.getElementById('opening-row-'+nextProps.appliedData.openingId).remove();

    }

  }

  onClick = e =>{
  
    let answer = window.confirm("Are you sure, you want to apply?")
    
    if (answer) {
      this.props.apply(e.target.id);
    }


    
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    
    let openingItems;
    if((this.props.openings).hasOwnProperty('result')){
      
      openingItems = this.props.openings.result.map((item,index)=>{ 

        let alreadyApplied = false;

      return <tr key ={item.id} id={"opening-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.job_title}</td>
          <td>{item.job_descr}</td>
          <td>{item.job_location}</td>
          <td>{item.skills_required}</td>
          <td>{item.closing_dt}</td>
          <td>
          { 
              item.user_applications.length>0 &&
                   item.user_applications.map((appl,index)=>{
                       
                       if(user.id==appl.user_id)
                              alreadyApplied =true;
                                        
                   })
          }
                 
             {
               alreadyApplied ? <p id={item.id} className="btn btn-sm btn-success" >Applied</p>:<button id={item.id} type="button" className="btn btn-sm btn-primary" onClick={this.onClick}>Apply</button> 
             }

          </td>
      </tr>
      });
  }

    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
                <div className="row">
                  
                     <div className ="col-md-8 mx-auto bg-white p-3 border">
                     <h5 className="p-2 font-weight-bold text-primary">Job Openings</h5>
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
                                        <th scope="col">Apply</th>
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

OpeningAll.propTypes = {
  getAllOpenings: PropTypes.func.isRequired,
  apply : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  openings:state.openings,
  appliedData:state.appliedData
});

export default connect(mapStateToProps,{ getAllOpenings,apply })(withRouter(OpeningAll));