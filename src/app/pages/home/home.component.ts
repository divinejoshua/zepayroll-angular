import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data/data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { selectAllCounter } from 'src/app/core/store/counter/counter.selectors';
import { selectAllTransactions } from 'src/app/core/store/transactions/transactions.selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    transactionsList$ : Observable<any>
    isLoading : boolean
    isError : boolean

    count$: Observable<number>;


    // Constructor
    constructor(private DataService : DataService, private router: Router, private store: Store<AppState>){
      this.isLoading = false
      this.isError = false
      this.count$ = store.select(selectAllCounter);
      this.transactionsList$ = store.select(selectAllTransactions);
    }



  //  async onGetTransactions() {


  //   try {
  //     // asynchronous operation
  //     await this.DataService.getTransactionList().subscribe(
  //       //Success
  //       (response: any) =>{
  //         this.transactionsList = response
  //         this.isLoading = false
  //       },

  //       // Error
  //       (error: any) => {
  //         console.log('Rrror  caught in component ')
  //         this.isLoading = false
  //         this.isError = true
  //       },
  //     )
  //   }

  //   finally {
  //       // this will always get executed
  //   }

  // }



  ngOnInit() {
    // this.onGetTransactions()
  }


}
