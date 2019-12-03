import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllRecommendedJobs} from "../../actions/openingActions";

class AllRecommendedJobs extends Component {
  constructor() {
    super();
    this.state = {
      openingId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getAllRecommendedJobs();
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

  onClick = e =>{
  
    /* let answer = window.confirm("Are you sure, you want to apply?")
    
    if (answer) {
      this.props.apply(e.target.id);
    } */

    alert("You have to apply Externally !!");

    
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    if((this.props.recommendedJobs).hasOwnProperty('result1')){
    
      this.props.recommendedJobs.result.map((item,index)=>{ 
        console.log("sjjsks msks ",item);
      
      });
    
    }
    
    let openingItems;
    if((this.props.recommendedJobs).hasOwnProperty('result')){
      
      openingItems = this.props.recommendedJobs.result.map((item,index)=>{ 
       console.log("sjsjs sksk",item[0]);
      return <tr key ={item[0].id} id={"opening-row-"+item[0].id}>
          <td>{index+1}</td>
          <td>{item[1].JobID}</td>
          <td>{item[1].Title}</td>
          <td>{item[1].Description}</td>
          <td>{item[1].State+","+item[1].City+","+item[1].Country}</td>
          <td>{item[1].Requirements}</td>
          <td>
             <button className="btn btn-primary" onClick={this.onClick}>Apply</button>
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
                  
                     <div className ="col-md-10 mx-auto bg-white p-3 border">
                     <h5 className="p-2 font-weight-bold text-primary">Recommended Openings</h5>
                           <div className="table-responsive">
                               <table className="table table-bordered text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Job Id</th>
                                        <th scope="col">Job Title</th>
                                        <th scope="col">Job Description</th>
                                        <th scope="col">State,City,Country</th>
                                        <th scope="col">Skills Required</th>
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

AllRecommendedJobs.propTypes = {
  getAllRecommendedJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  recommendedJobs:state.recommendedJobs,
});

export default connect(mapStateToProps,{ getAllRecommendedJobs})(withRouter(AllRecommendedJobs));