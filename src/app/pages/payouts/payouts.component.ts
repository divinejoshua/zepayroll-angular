import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data/data.service';


@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent {

  payoutGroupList : any
  isLoading : boolean
  isError : boolean

  showCreatePayoutOverlay : boolean = true


  // Constructor
  constructor(private DataService : DataService, private router: Router){
    this.payoutGroupList = []
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
          this.payoutGroupList = response
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
