import {RECOMMENDED_JOBS} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case RECOMMENDED_JOBS: 
          return action.payload;

      default:
           return state;
  }
}