import axios from "axios";

import {
  GET_ERRORS,
  GET_SUCCESS_MSG,
  FETCH_OPENINGS,
  RESET_SUCCESS_STATE,
  RESET_ERROR_STATE
} from "./types";


// Get All Openings
export const getAllMyOpenings = (history) => dispatch => {
  axios
    .get("openings/myOpenings")
    .then(res => {
                  dispatch({
                    type: FETCH_OPENINGS,
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

// Add Section
export const addOpening = (data, history) => dispatch => {
  axios
    .post("openings/opening",data)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  })
                  history.push("/allOpenings");
                 
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




// Update Disability
export const updateMyOpening = (data, history) => dispatch => {
  axios
    .put(`openings/opening/${data.id}`,data)
    .then(res => {
                  dispatch({
                    type: GET_SUCCESS_MSG,
                    payload: res.data
                  })
                  history.push("/allOpenings");
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

