import axios from "axios";

import {
  GET_ERRORS,
  GET_SUCCESS_MSG,
  FETCH_USER_PROFILE,
  UPDATED_USER_PROFILE,
  RESET_SUCCESS_STATE,
  RESET_ERROR_STATE
} from "./types";


// Profile User
export const userProfile = (history) => dispatch => {
  axios
    .get("users/userProfile")
    .then(res => { console.log("Response",res);
                  dispatch({
                    type: FETCH_USER_PROFILE,
                    payload: res.data
                  })
                  //history.push("/login")

                  dispatch({
                    type: RESET_ERROR_STATE
                  });
                }
         ) // re-direct to login on successful register
    .catch(err => 
      { 
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      
      dispatch({
        type: RESET_SUCCESS_STATE
      });
    }
    );
};

// Update User Profile
export const userProfileUpdation = (userData, history) => dispatch => {
  axios
    .put("users/userProfile",userData)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  })

                  dispatch({
                    type: UPDATED_USER_PROFILE,
                    payload: userData
                  })

                  /*dispatch({
                    type: SET_USER_FIRST_NAME,
                    payload: {firstName: userData.first_name}
                  })*/

                  /*dispatch({
                    type: RESET_ERROR_STATE
                  });*/
                }
         ) 
    .catch(err => 
      { //console.log(err);
          dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });

        dispatch({
          type: RESET_SUCCESS_STATE
        });
    }
    );
};


// Profile Employer
export const employerProfile = (history) => dispatch => {
  axios
    .get("users/employerProfile")
    .then(res => {
                  dispatch({
                    type: FETCH_USER_PROFILE,
                    payload: res.data
                  })
                  //history.push("/login")

                  dispatch({
                    type: RESET_ERROR_STATE
                  });
                }
         ) // re-direct to login on successful register
    .catch(err => 
      { 
        dispatch({
        type: GET_ERRORS,
        payload: ""//err
      })
      
      dispatch({
        type: RESET_SUCCESS_STATE
      });
    }
    );
};

// Update User Profile
export const employerProfileUpdation = (userData, history) => dispatch => {
  axios
    .put("users/employerProfile",userData)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  })

                  dispatch({
                    type: UPDATED_USER_PROFILE,
                    payload: userData
                  })

                  /*dispatch({
                    type: RESET_ERROR_STATE
                  });*/
                }
         ) 
    .catch(err => 
      { //console.log(err);
          dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });

        dispatch({
          type: RESET_SUCCESS_STATE
        });
    }
    );
};


// Update User Profile Pic
export const userProfilePicUpload = (formData, history) => dispatch => {
  axios
    .post("fileHandling/profileImage",formData)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  });
 
                }
         ) 
    .catch(err => 
      {
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })

      dispatch({
        type: RESET_SUCCESS_STATE
      });
    
    }
    );
};

