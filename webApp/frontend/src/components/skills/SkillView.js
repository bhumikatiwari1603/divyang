import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllSkills} from "../../actions/skillActions";

class SkillView extends Component {
  constructor() {
    super();
    this.state = {
      skillId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getAllSkills();
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
    let skillItems;
    if((this.props.skills).hasOwnProperty('result')){
      
      skillItems = this.props.skills.result.map((item,index)=>(
      <tr key ={item.id} id={"skill-row-"+item.id}>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td><Link to={{pathname:"/editSkill",skillId:item.id}} ><button className="btn btn-sm btn-primary edit">Edit</button></Link>&nbsp;
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
                     <h5 className="p-2 font-weight-bold text-primary">Skills</h5>
                           <div className="table-responsive">
                               <table className="table table-bordered text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">skill Name</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody id="skills-list">
                                        {skillItems}
                                          
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

SkillView.propTypes = {
  getAllSkills: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  skills:state.skills
});

export default connect(mapStateToProps,{ getAllSkills })(withRouter(SkillView));