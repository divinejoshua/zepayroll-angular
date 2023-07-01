import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    transactionsList : any
    isLoading : boolean
    isError : boolean


    // Constructor
    constructor(private DataService : DataService, private router: Router){
      this.transactionsList = []
      this.isLoading = false
      this.isError = false
    }


   // On Submit
   async onGetTransactions() {


    try {
      // asynchronous operation
      await this.DataService.getTransactionList().subscribe(
        //Success
        (response: any) =>{
          this.transactionsList = response
          this.isLoading = false
        },

        // Error
        (error: any) => {
          console.log('Rrror  caught in component ')
          this.isLoading = false
          this.isError = true
        },
      )
    }

    finally {
        // this will always get executed
    }

  }



  ngOnInit() {
    this.onGetTransactions()
  }


}
