import {APPLY_OPENING} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case APPLY_OPENING: 
          return action.payload;

      default:
           return state;
  }
}