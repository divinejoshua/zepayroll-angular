import { CounterState } from "./counter/counter.reducer";
import { TransactionState } from "./transactions/transactions.reducer";


// List all your states in here
export interface AppState {
  counter: CounterState;
  transactions: TransactionState;
}
