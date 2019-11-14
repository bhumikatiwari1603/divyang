import {FETCH_DISABILITIES} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case FETCH_DISABILITIES: 
          return action.payload;

      default:
           return state;
  }
}