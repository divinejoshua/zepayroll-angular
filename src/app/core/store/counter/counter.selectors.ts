import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CounterState } from './counter.reducer';

export const selectCounter = (state: AppState) => state.counter;

export const selectAllCounter = createSelector(
  selectCounter,
  (state: CounterState) => state.counterValue
);
