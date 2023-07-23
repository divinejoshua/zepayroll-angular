import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { AppState } from 'src/app/core/store/app.state';
import { selectAllTransactions } from 'src/app/core/store/transactions/transactions.selectors';


@Component({
  selector: 'app-payoutdetails',
  templateUrl: './payoutdetails.component.html',
  styleUrls: ['./payoutdetails.component.css']
})
export class PayoutdetailsComponent {

  // URL parameters
  payoutId: string = "";

  // Data from API
  payoutDetailList$ : Observable<any>
  isLoading : boolean
  isError : boolean
  message : any
  // DataService: any;

  constructor(private DataService : DataService, router: ActivatedRoute, private store: Store<AppState>,) {

    this.payoutDetailList$ = store.select(selectAllTransactions);
    this.isLoading = false
    this.isError = false
    this.message = ""

    // Get the router parameter
    router.params.subscribe((params) => {
      this.payoutId = params["payoutId"];
    });

    // Get logged in user details
  }


  // Get logged in user details
  async getCheckApi() {
    this.message = ""
    this.DataService.checkApi().subscribe(
      data =>{ this.message =  "Added successfully"; },
      error =>{  }
      );
  }





  ngOnInit() {
    //
    this.getCheckApi()
  }





}
