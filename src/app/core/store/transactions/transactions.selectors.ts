import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TransactionState } from './transactions.reducer';

export const selectTransactions = (state: AppState) => state.transactions;
export const selectGroupList = (state: AppState) => state.transactions;


// Select all transactions
export const selectAllTransactions = createSelector(
  selectTransactions,
  (state: TransactionState) => state.transactionListValue
);

//Select all grouplist
export const selectAllGroupList = createSelector(
  selectTransactions,
  (state: TransactionState) => state.transactionListValue
);
