import { createAction, props } from '@ngrx/store';

//Declare the actions
export const saveAccessToken = createAction('[Authentication] Save access token to store', props<{ access_token:string}>());
export const saveUserDetails = createAction('[Authentication] Save user details to store', props<{ userDetails: object}>());

export const getNewAccessToken = createAction('[Authentication] Get a new access token vie refresh token');

// Get new access token on success
export const getNewAccessTokenSuccess = createAction(
  '[Get new access token] Load Success',
  props<{ access_token: string}>()
);

// Get transactions on failure
export const getNewAccessTokenFailure = createAction('[Get new access token] Load Failure');
