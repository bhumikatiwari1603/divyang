import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllQualifications} from "../../actions/qualificationActions";

class QualificationView extends Component {
  constructor() {
    super();
    this.state = {
      qualificationId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getAllQualifications();
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
    let qualificationItems;
    if((this.props.qualifications).hasOwnProperty('result')){
      
      qualificationItems = this.props.qualifications.result.map((item,index)=>(
      <tr key ={item.id} id={"qualification-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.university_name}</td>
          <td>{item.degree_level}</td>
          <td>{item.qualification_name}</td>
          <td>{item.start_dt}</td>
          <td>{item.completion_dt}</td>

          <td><Link to={{pathname:"/editQualification",qualificationId:item.id}} ><button className="btn btn-sm btn-primary edit">Edit</button></Link>&nbsp;
          </td>
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
                     <h5 className="p-2 font-weight-bold text-primary">Qualifications</h5>
                           <div className="table-responsive">
                               <table className="table table-bordered text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">University</th>
                                        <th scope="col">Degree Level</th>
                                        <th scope="col">Qualification</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody id="qualifications-list">
                                        {qualificationItems}
                                          
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

QualificationView.propTypes = {
  getAllQualifications: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  qualifications:state.qualifications
});

export default connect(mapStateToProps,{ getAllQualifications })(withRouter(QualificationView));
