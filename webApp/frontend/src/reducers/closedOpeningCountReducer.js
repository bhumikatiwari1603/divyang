import {FETCH_CLOSED_OPENINGS_COUNT} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case FETCH_CLOSED_OPENINGS_COUNT: 
          return action.payload;

      default:
           return state;
  }
}