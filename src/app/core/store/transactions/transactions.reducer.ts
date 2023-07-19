import { createReducer, on } from '@ngrx/store';
import { getTransactionList, getTransactionListSuccess, getTransactionListFailure } from './transactions.actions';
import { DataService } from '../../services/data/data.service';


export interface TransactionState {
  dataListValue: any;
  error : boolean;
  isLoading: boolean;
}

// initial value of the state
export const initialState : TransactionState = {
  dataListValue: [],
  error: false,
  isLoading: false,
};



const _transactionsReducer = createReducer(initialState,

  //Get transaction list (Set loading state to true)
  on(getTransactionList, function(state) {
    return {
      ...state,
      isLoading: true
    };
  }),


  // Load the value of transaction when the call is successful
  on(getTransactionListSuccess, function(state, { dataList, error }) {
    return {
      ...state,
      dataListValue: dataList.transactions, //Get transactions from data list transactions
      error: error,
      isLoading: false,
    };
  }),


  // Load the value of transaction when the call fails
  on(getTransactionListFailure, function(state, { error }) {
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),


);

export function transactionsReducer(state : any, action: any) {
  return _transactionsReducer(state, action);
}
