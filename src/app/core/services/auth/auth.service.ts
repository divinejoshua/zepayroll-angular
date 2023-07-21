import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  // Base Url from environment variable

  response: any;


  //Send login request
  sendLoginCredentials(bodyParams: object) : Observable<object> {
    this.response = this.http.post("http://127.0.0.1:8000/accounts/auth/login/", bodyParams);
    return  this.response
  }

  // Get the logged in user details
  getLogggedInUser() : Observable<object> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5OTYwNTk3LCJpYXQiOjE2ODk5NjA1MzcsImp0aSI6IjU2YmRiZmJhZDQ5OTQwMjNiZWU4MThkZWFkZDQ2ZDBlIiwidXNlcl9pZCI6MX0.rDIvdaDzjyUF8UsnkSqtdMpsqYx0ijSoJiEeFCP_SuQ', // Replace with your actual authorization header value
    });

    const options = { headers: headers };

    this.response = this.http.get("http://127.0.0.1:8000/accounts/user/", options );
    return  this.response
  }

}
