import {FETCH_OPENINGS} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case FETCH_OPENINGS: 
          return action.payload;

      default:
           return state;
  }
}