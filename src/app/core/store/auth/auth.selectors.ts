import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthUserState } from './auth.reducer';

export const selectAccessToken = (state: AppState) => state.auth;
export const selectUserDetails = (state: AppState) => state.auth;


// Select all transactions
export const selectAllAccessToken = createSelector(
  selectAccessToken,
  (state: AuthUserState) => state.access_token
);

//Select all grouplist
export const selectAllUserDetails = createSelector(
  selectUserDetails,
  (state: AuthUserState) => state.userDetails
);
