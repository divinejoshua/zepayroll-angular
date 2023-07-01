import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data/data.service';


@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent {

  // API data items
  payoutGroupList : any
  isLoading : boolean
  isError : boolean

  // Overlay display
  overlay : boolean = false
  showCreatePayoutOverlay : boolean = false

  // Selected file nam
  fileName : string = ""


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


  // Get the selected file name
  onFileSelected(event : any) {
    if(event.target.files.length > 0)
     {
      this.fileName = event.target.files[0].name
     }
   }

  ngOnInit() {
    this.onGetTransactions()
  }



}
