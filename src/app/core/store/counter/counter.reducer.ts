import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.action';


export interface CounterState {
  counterValue: number;
}

// initial value of the state
export const initialState : CounterState = {
  counterValue: 1234,
};

const _counterReducer = createReducer(initialState,

  // Increment function
  on(increment, function(state) : any {
    return state.counterValue + 1;
  }),

  //Decrement function
  on(decrement, function(state) : any {
    return state.counterValue - 1;
  }),

  // Reset counter
  on(reset, function(state) : any {
    return state.counterValue =0;
  }),
);

export function counterReducer(state : any, action: any) {
  return _counterReducer(state, action);
}
