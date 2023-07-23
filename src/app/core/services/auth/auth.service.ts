import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { saveAccessToken, saveUserDetails } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private store: Store<AppState>) { }

  // Base Url from environment variable
  baseUrl: string =  environment.apiUrl

  response: any;


  //Send login request
  sendLoginCredentials(bodyParams: object) : Observable<object> {
    this.response = this.http.post(this.baseUrl+"/accounts/auth/login/", bodyParams);
    return  this.response
  }

  // Get the logged in user details
  getLogggedInUser() : Observable<object> {

    this.response = this.http.get(this.baseUrl+"accounts/user/" )

    //Save the user details to state
    .subscribe(
      (response) => {
        let userDetails = response
        this.store.dispatch(saveUserDetails({ userDetails }))
      },
      // Any errors
      (error:any) => {
        // console.log('HTTP Error')
      },
      );

    return  this.response
  }


    //Get new access token from the refresh token
    getNewAccessToken() : Observable<object> {

      // Set the refresh token as the body parameter
      const bodyParams = {
        'refresh': localStorage.getItem('refresh_token')
      }

      this.response = this.http.post(this.baseUrl+"accounts/auth/token/refresh/", bodyParams)
      .subscribe(
        (response: any) => {

        // Get the access token and store it in the NGRX
        let access_token = response.access
        this.store.dispatch(saveAccessToken({ access_token }));
          this.getLogggedInUser()
      },

      (error:any) => {
        // console.log('')
      },

      );
      return  this.response
    }


    logoutUser() {
       // Set the refresh token as the body parameter
      const bodyParams = {
        'refresh': localStorage.getItem('refresh_token')
      }

      this.response = this.http.post(this.baseUrl+"accounts/auth/logout/", bodyParams)

      //Remove the refresh token from local storage
      localStorage.setItem("refresh_token", "");

      return  this.response
    }

}
