import { HttpClient } from '@angular/common/http';
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
  sendLoginCredentials(bodyParams: object) : Observable<any[]> {
    this.response = this.http.post("http://127.0.0.1:8000/accounts/auth/login/", bodyParams);
    return  this.response
  }


}
