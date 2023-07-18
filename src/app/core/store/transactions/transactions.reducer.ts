import { createReducer, on } from '@ngrx/store';
import { TransactionsActions } from './transactions.actions';

export const transactionsFeatureKey = 'transactions';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

