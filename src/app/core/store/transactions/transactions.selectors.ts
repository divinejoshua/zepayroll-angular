import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TransactionState } from './transactions.reducer';

export const selectTransactions = (state: AppState) => state.transactions;

export const selectAllTransactions = createSelector(
  selectTransactions,
  (state: TransactionState) => state.dataListValue
);
