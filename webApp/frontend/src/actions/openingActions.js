import axios from "axios";

import {
  GET_ERRORS,
  GET_SUCCESS_MSG,
  FETCH_OPENINGS,
  FETCH_CLOSED_OPENINGS,
  FETCH_OPENINGS_COUNT,
  FETCH_CLOSED_OPENINGS_COUNT,
  RESET_SUCCESS_STATE,
  RESET_ERROR_STATE
} from "./types";


// Get All My Opened Openings
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

// Get All My Open Openings
export const getAllMyOpeningsCount = (history) => dispatch => {
  axios
    .get("openings/myOpeningsCount")
    .then(res => {
                  dispatch({
                    type: FETCH_OPENINGS_COUNT,
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

// Get All My Closed Openings
export const getAllMyClosedOpenings = (history) => dispatch => {
  axios
    .get("openings/myClosedOpenings")
    .then(res => {
                  dispatch({
                    type: FETCH_CLOSED_OPENINGS,
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




// Get All My Open Openings
export const getAllMyClosedOpeningsCount = (history) => dispatch => {
  axios
    .get("openings/myClosedOpeningsCount")
    .then(res => {
                  dispatch({
                    type: FETCH_CLOSED_OPENINGS_COUNT,
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

