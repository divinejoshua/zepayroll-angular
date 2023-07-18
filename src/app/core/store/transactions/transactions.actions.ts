import { createAction, props } from '@ngrx/store';

//Declare the actions
export const getTransactionList   = createAction('[Home Component] Get Transactions');
export const getGroupList         = createAction('[Payout Component] Get Payout Groups');

// Get transactions on success
export const getTransactionListSuccess = createAction(
  '[Get Transactions API] Load Success',
  props<{ dataList: any, error : boolean }>()
);

// Get transactions on failure
export const getTransactionListFailure = createAction(
  '[Get Transactions API] Load Failure',
  props<{ error: boolean }>()
);
