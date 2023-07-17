import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/counter.action';


// initial value of the state
export const initialState = 3846;

const _counterReducer = createReducer(initialState,

  // Increment function
  on(increment, function(state) {
    return state + 1;
  }),

  //Decrement function
  on(decrement, function(state) {
    return state - 1;
  }),

  // Reset counter
  on(reset, function() {
    return 0;
  }),
);

export function counterReducer(state : any, action: any) {
  return _counterReducer(state, action);
}
