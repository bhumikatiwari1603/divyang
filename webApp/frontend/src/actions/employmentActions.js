import axios from "axios";

import {
  GET_ERRORS,
  GET_SUCCESS_MSG,
  FETCH_EMPLOYMENT_DETAILS,
  RESET_SUCCESS_STATE,
  RESET_ERROR_STATE
} from "./types";


// Get All Employment
export const getAllEmploymentDetails = (history) => dispatch => {
  axios
    .get("employments/myEmployments")
    .then(res => {
                  dispatch({
                    type: FETCH_EMPLOYMENT_DETAILS,
                    payload: res.data
                  })
                  
                  /*dispatch({
                    type: RESET_ERROR_STATE
                  });*/
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

// Add
export const addEmploymentDetail = (data, history) => dispatch => {
  axios
    .post("employments/employment",data)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  })
                  history.push("/allEmployments");
                 
                  /* dispatch({
                    type: UPDATED_USER_PROFILE,
                    payload: userData
                  }) */

                  /*dispatch({
                    type: RESET_ERROR_STATE
                  });*/
                }
         ) 
    .catch(err => 
      { 
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




// Update Employment
export const updateEmploymentDetail = (data, history) => dispatch => {
  axios
    .put(`employments/employment/${data.id}`,data)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  })
                  history.push("/allEmployments");
                  /*dispatch({
                    type: RESET_ERROR_STATE
                  });*/
                }
         ) 
    .catch(err => 
      { 
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

