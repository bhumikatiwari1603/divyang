import {MY_ACTIVE_APPLICATIONS_COUNT} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case MY_ACTIVE_APPLICATIONS_COUNT: 
          return action.payload;

      default:
           return state;
  }
}