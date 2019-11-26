import {USER_APPLICATIONS_COUNT} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case USER_APPLICATIONS_COUNT: 
          return action.payload;

      default:
           return state;
  }
}