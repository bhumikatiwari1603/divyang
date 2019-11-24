import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import disabilityReducer from "./disabilityReducer";
import skillReducer from "./skillReducer";
import qualificationReducer from "./qualificationReducer";
import employmentReducer from "./employmentReducer";
import openingReducer from "./openingReducer";
import errorReducer from "./errorReducer";
import successReducer from "./successReducer";
import { RESET_ALL_STATE,RESET_SUCCESS_STATE ,RESET_ERROR_STATE} from "../actions/types";


const appReducer = combineReducers({
  auth: authReducer,
  profile:profileReducer,
  disabilities:disabilityReducer,
  skills:skillReducer,
  qualifications:qualificationReducer,
  employments:employmentReducer,
  openings : openingReducer,
  errors: errorReducer,
  success: successReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_ALL_STATE) {
    state = undefined;
  }

  if (action.type === RESET_SUCCESS_STATE) {
    state.success = undefined;
  }

  if (action.type === RESET_ERROR_STATE) {
    state.errors = undefined;
  }
  
  return appReducer(state, action);
};

export default rootReducer;