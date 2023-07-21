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


  // Get search results
  sendLoginCredentials() : Observable<any[]> {

    this.response = this.http.get("http://127.0.0.1:8000/accounts/auth/login")

    return  this.response
  }
}
