import {FETCH_QUALIFICATIONS} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case FETCH_QUALIFICATIONS: 
          return action.payload;

      default:
           return state;
  }
}