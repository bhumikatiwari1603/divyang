import {FETCH_SKILLS} from '../actions/types';

const initialState = {}

export default function(state=initialState,action){
  switch(action.type){

   case FETCH_SKILLS: 
          return action.payload;

      default:
           return state;
  }
}