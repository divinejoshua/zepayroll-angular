import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payoutdetails',
  templateUrl: './payoutdetails.component.html',
  styleUrls: ['./payoutdetails.component.css']
})
export class PayoutdetailsComponent {

  // URL parameters
  payoutId: string = "";

  // Data from API
  transactionsList : any
  isLoading : boolean
  isError : boolean

  constructor(router: ActivatedRoute) {

    this.transactionsList = []
    this.isLoading = false
    this.isError = false

    // Get the router parameter
    router.params.subscribe((params) => {
      this.payoutId = params["payoutId"];
    });



  }

}
