import { GET_SUCCESS_MSG,RESET_ALL_STATE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SUCCESS_MSG:
        return action.payload;
      default:
        return state;
    }
  }