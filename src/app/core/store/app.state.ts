import { CounterState } from "./counter/counter.reducer";
import { TransactionState } from "./transactions/transactions.reducer";
import { AuthUserState } from "./auth/auth.reducer";


// List all your states in here
export interface AppState {
  counter: CounterState;
  transactions: TransactionState;
  auth: AuthUserState,
}
