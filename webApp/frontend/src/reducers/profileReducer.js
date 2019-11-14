import {FETCH_USER_PROFILE, UPDATED_USER_PROFILE} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){console.log("State",state,"Action",action.payload)
  switch(action.type){
   case FETCH_USER_PROFILE: 
          return action.payload;
   
   case UPDATED_USER_PROFILE:
      const newState = { ...state };
      newState.userDetails = action.payload;
      return newState;
      
      default:
           return state;
  }
}