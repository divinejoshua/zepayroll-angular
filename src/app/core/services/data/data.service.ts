import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // Base Url from environment variable
  baseUrl: string =  environment.apiUrl

  transactionList: any;
  response: any;


  // Get search results
  getTransactionList() : Observable<any[]> {

    this.transactionList = this.http.get("assets/data/transactions.json")

    return  this.transactionList
  }

  //Send login request
  checkApi() : Observable<object> {
    // Set the refresh token as the body parameter
    const bodyParams = {
      'none': "none"
    }
    this.response = this.http.post(this.baseUrl+"accounts/user/", bodyParams)
    return  this.response


  }

}
