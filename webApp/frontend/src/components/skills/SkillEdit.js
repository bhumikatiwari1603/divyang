import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSkill} from "../../actions/skillActions";
import classnames from "classnames";

class SkillEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      id:"",
      errors: {},
      success:{}
    };
  }

  componentDidMount(){
    
    let skillId = this.props.location.skillId; 
    if(typeof (skillId) !='number')
     {
    
      this.props.history.push("/allSkills");
     }


     if(this.props.skills.hasOwnProperty('result')){

      this.props.skills.result.map((item)=>{
      
        if(item.id==skillId)
         {
           this.setState({
                name : item.name,
                id   : item.id
           });
           return;
         }
       
      });

     }

    
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
    else{
      document.getElementById('msg-box').style.display="none";
    }

  }

  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
  
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const skillDetails = {
      id: this.state.id,
      name : this.state.name
    };

    this.props.updateSkill(skillDetails, this.props.history); 
  
  };

 
  render() {
    const { errors } = this.state;
    
    return (
      <div className="container p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
                <div className="row">
                <div className ="col-md-5 mx-auto bg-white p-3 border">
                    
                  <h5 className="p-2 font-weight-bold">Edit Skill Name</h5>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                          <div className="row">
                              <div className="col-md-12">
                                    <div className="form-group">
                                     <div>
								                         <span className="text-light-black">Name</span>
							                       </div>
                                      <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                        placeholder="Skill Name"
                                        required
                                        pattern="^[a-zA-Z]+$"
                                        className={classnames("form-control", {
                                          invalid: errors.name
                                        })}
                                      />
                                    </div>
                                  </div> 
                            </div>

                            
                                 
                      <div className="row">
                        <div className="col-md-12 text-center p-2">
                            <button
                              type="submit"
                              className="btn btn-primary btn-block btn-flat"
                            >
                              Update Skill
                            </button>
                          </div> 
                      </div>
                    </form>
                    </div>                
                </div>
            </div>
        </div>
      </div>
    );
  }
}

SkillEdit.propTypes = {
  updateSkill: PropTypes.func.isRequired,
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

export default connect(mapStateToProps,{ updateSkill })(withRouter(SkillEdit,{id:Number}));