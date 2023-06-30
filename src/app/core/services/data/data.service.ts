import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  // Base Url from environment variable

  transactionList: any;


  // Get search results
  getTransactionList() {

    this.transactionList = this.http.get("assets/data/transactions.json")

    return  this.transactionList
  }

}
