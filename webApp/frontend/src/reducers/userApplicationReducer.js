import {USER_APPLICATIONS} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case USER_APPLICATIONS: 
          return action.payload;

      default:
           return state;
  }
}