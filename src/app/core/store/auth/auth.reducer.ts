import { createReducer, on } from '@ngrx/store';
import { saveAccessToken, saveUserDetails, getNewAccessToken, getNewAccessTokenSuccess, getNewAccessTokenFailure } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';


export interface AuthUserState {
  access_token: string;
  userDetails: object;
}

// initial value of the state
export const initialState : AuthUserState = {
  access_token: "",
  userDetails: {},
};



const _authReducer = createReducer(initialState,


  // Save the access token
  on(saveAccessToken, function(state, { access_token }) {
    return {
      ...state,
      access_token: access_token, //Save the access token
    };
  }),


    // Save the access token
    on(saveUserDetails, function(state, { userDetails }) {
      return {
        ...state,
        userDetails: userDetails, //Save the access token
      };
    }),





);

export function authReducer(state : any, action: any) {
  return _authReducer(state, action);
}
