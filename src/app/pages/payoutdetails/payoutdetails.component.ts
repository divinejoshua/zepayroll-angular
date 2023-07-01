import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payoutdetails',
  templateUrl: './payoutdetails.component.html',
  styleUrls: ['./payoutdetails.component.css']
})
export class PayoutdetailsComponent {

  payoutId: string = "";

  constructor(router: ActivatedRoute) {

    // Get the router parameter
    router.params.subscribe((params) => {
      this.payoutId = params["payoutId"];
    });


  }

}
