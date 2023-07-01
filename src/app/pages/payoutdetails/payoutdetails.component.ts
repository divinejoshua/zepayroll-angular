import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/services/data/data.service';


@Component({
  selector: 'app-payoutdetails',
  templateUrl: './payoutdetails.component.html',
  styleUrls: ['./payoutdetails.component.css']
})
export class PayoutdetailsComponent {

  // URL parameters
  payoutId: string = "";

  // Data from API
  payoutDetailList : any
  isLoading : boolean
  isError : boolean
  // DataService: any;

  constructor(private DataService : DataService, router: ActivatedRoute) {

    this.payoutDetailList = []
    this.isLoading = false
    this.isError = false

    // Get the router parameter
    router.params.subscribe((params) => {
      this.payoutId = params["payoutId"];
    });

  }



  // On Submit
  async onGetTransactions() {


    try {
      // asynchronous operation
      await this.DataService.getTransactionList().subscribe(
        //Success
        (response: any) =>{
          this.payoutDetailList = response
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
