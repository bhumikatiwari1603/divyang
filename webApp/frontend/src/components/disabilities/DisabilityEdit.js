import React, { Component } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDisability} from "../../actions/disabilityActions";
import classnames from "classnames";

class DisabilityEdit extends Component {
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
    
    let disabilityId = this.props.location.disabilityId; 
    if(typeof (disabilityId) !='number')
     {
    
      this.props.history.push("/allDisabilities");
     }


     if(this.props.disabilities.hasOwnProperty('result')){

      this.props.disabilities.result.map((item)=>{
      
        if(item.id==disabilityId)
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
    
    const disabilityDetails = {
      id: this.state.id,
      name : this.state.name
    };

    this.props.updateDisability(disabilityDetails, this.props.history); 
  
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
                    
                  <h5 className="p-2 font-weight-bold">Edit Disability Name</h5>
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
                                        placeholder="Disability Name"
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
                              Update Disability
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

DisabilityEdit.propTypes = {
  updateDisability: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  disabilities:state.disabilities
});

export default connect(mapStateToProps,{ updateDisability })(withRouter(DisabilityEdit,{id:Number}));