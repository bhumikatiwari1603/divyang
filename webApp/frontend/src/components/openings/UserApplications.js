import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserApplications} from "../../actions/openingActions";

class UserApplications extends Component {
  constructor() {
    super();
    this.state = {
      openingId: "",
      errors: {},
      success:{}
    };
  }
  
  componentWillMount(){
    this.props.getUserApplications();
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
    e.preventDefault();

    this.setState({
      applicantDetails : e.target.getAttribute('applicantDetails'),
      openingId : e.target.getAttribute('openingId'),
      jobTitle : e.target.getAttribute('jobTitle')
    });


    

  }

  onModalClose = e =>{
    e.preventDefault();
    let applicantDetailsObj = JSON.parse(this.state.applicantDetails); 
    console.log("Applicant DEtails....",applicantDetailsObj)
    this.setState({
      applicantDetails:"",
      openingId : "",
      jobTitle : "" 
    })
  }

  render() {
    const { errors } = this.state;
    let userApplicationItems;
    if((this.props.userApplications).hasOwnProperty('result')){
      
      userApplicationItems = this.props.userApplications.result.map((item,index)=>{
      console.log("USer Aplications Length ", item.user_applications.length);
          if(item.user_applications.length>0)
          {
            return item.user_applications.map((appl,i)=>(
                <tr key ={item.id} id={"opening-row-"+item.id}>
                    <td>{i+1}</td>
                    <td>{item.job_title}</td>
                    <td>{appl.user.first_name+" "+appl.user.last_name}</td>
                    <td>{appl.user.email}</td>
                      <td>
                         <button data-backdrop="static" data-keyboard="false" data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-success"  applicantDetails={JSON.stringify(appl)} openingId={item.id} jobTitle={item.job_title} onClick={this.onClick} id={"a-opening-id-"+item.id}>View Profile </button>
                     </td>
                </tr>
            ));

          }
    });
  
  }


     if(this.state.applicantDetails)
      { 
        
         let applicantDetailsObj = JSON.parse(this.state.applicantDetails); 
          
          /*applicantDetail = applicantDetailsObj.order_details.map((item,index)=>{
          
         return (
                  <React.Fragment>
                             <tr>
                                <td className="text-center text-primary">{item.quantity}</td>
                                <td className="text-center">{item.name_of_item}</td>
                                <td className="text-center">${item.total_price}</td> 
                            </tr> 
                  </React.Fragment>  
               )
             }
           );*/
      }



    return (
      <div className="container-fluid p-4">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">
           <h5 className="p-2" id="msg-box" style={{display:'none'}}></h5>
                <div className="row">
                  
                     <div className ="col-md-8 mx-auto bg-white p-3 border">
                     <h5 className="p-2 font-weight-bold text-primary">User Applications</h5>
                           <div className="table-responsive">
                               <table className="table table-bordered text-center">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Job Title</th>
                                        <th scope="col">Applicant Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody id="openings-list">
                                       {userApplicationItems}                    
                                          
                                    </tbody>      
                               </table>
                           </div>
                    </div>                
                </div>


              <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title text-center" id="exampleModalLabel">Order Id : <b className="text-info">54454</b></h5>
                                        <button type="button" className="close" data-dismiss="modal" onClick={this.onModalClose} aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                      
                                      <div className="row border-top border-black p-2">
                                                <div className="col-md-4 text-left">
                                                  Status : <b className="text-info">skskkskk</b>
                                                </div>
                                                {/* <div className="col-md-6 text-right">
                                                  Ordered On : <b>{
                                                                    //this.state.orderedOn
                                                                    //new Date("2016-01-04 10:34:23")
                                                                    }</b>
                                                </div> */}
                                                <div className="col-md-8 text-right">
                                                  Person Name : <b>jajakjsj sjsj</b>
                                                </div>
                                                <div className="col-md-12 text-left">
                                                  Delivery Address : <b>jsyywyw wywy</b>
                                                </div> 
                                        </div>
 
                                          <div className="row">
                                                     <div className="table-responsive">
                                                             <table className="table">
                                                                <thead className="text-center">
                                                                <tr>
                                                                  <th scope="col">Quantity</th>
                                                                  <th scope="col">Item Name</th>
                                                                  <th scope="col">Price</th>
                                                                </tr>
                                                                </thead>
                                                                 <tbody>
                                                                     orederDetail 
                                                                  </tbody> 
                                                             </table>
                                                        
                                                        </div>
                                          </div>
                                          <div className="row border-top border-black p-2">
                                                <div className="col-md-6 text-right font-weight-bold">
                                                  Items subtotal
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    total bill
                                                </div> 
                                            </div>      
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.onModalClose} >Close</button>
                                      </div>
                                    </div>
                                  </div>
                        </div> 












            </div>
        </div>
      </div>
    );
  }
}

UserApplications.propTypes = {
  getUserApplications : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  userApplications:state.userApplications
});

export default connect(mapStateToProps,{ getUserApplications })(withRouter(UserApplications));