import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data/data.service';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { Store } from '@ngrx/store';
import { selectAllGroupList } from 'src/app/core/store/transactions/transactions.selectors';



@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent {

  // API data items
  payoutGroupList$ : Observable<any>
  isLoading : boolean
  isError : boolean

  // Overlay display
  overlay : boolean = false
  showCreatePayoutOverlay : boolean = false

  // Selected file nam
  fileName : string = ""


  // Constructor
  constructor(private DataService : DataService, private router: Router, private store: Store<AppState>){
    this.payoutGroupList$ = store.select(selectAllGroupList);
    this.isLoading = false
    this.isError = false
  }



  // Get the selected file name
  onFileSelected(event : any) {
    if(event.target.files.length > 0)
     {
      this.fileName = event.target.files[0].name
     }
   }

  ngOnInit() {
    //
  }



}
