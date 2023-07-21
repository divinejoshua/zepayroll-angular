import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development';
import { saveUserDetails } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private store: Store<AppState>) { }

  // Base Url from environment variable

  response: any;


  //Send login request
  sendLoginCredentials(bodyParams: object) : Observable<object> {
    this.response = this.http.post("http://127.0.0.1:8000/accounts/auth/login/", bodyParams);
    return  this.response
  }

  // Get the logged in user details
  getLogggedInUser() : Observable<object> {

    this.response = this.http.get("http://127.0.0.1:8000/accounts/user/" )

    //Save the user details to state
    .subscribe((response) => {
      let userDetails = response
      this.store.dispatch(saveUserDetails({ userDetails }))
    });

    return  this.response
  }


    //Get new access token
    getNewAccessToken(bodyParams: object) : Observable<object> {
      this.response = this.http.post("http://127.0.0.1:8000/accounts/auth/login/", bodyParams);
      return  this.response
    }

}
