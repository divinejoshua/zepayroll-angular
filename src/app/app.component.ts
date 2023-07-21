import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTransactionList } from 'src/app/core/store/transactions/transactions.actions';
import { AppState } from './core/store/app.state';
import { AuthService } from './core/services/auth/auth.service';
import { saveUserDetails } from './core/store/auth/auth.actions';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zepayroll-angular';
  initialLoading : boolean = true;

  constructor(private store: Store<AppState>, private AuthService:AuthService,){
    this.getLoggedInUserDetails()
  }

  onAppLoad (){
     // Terminate the loader
     setTimeout(() => this.initialLoading = false, 2000);
  }

  onGetTransactions() {
    // Get transactions list from store
    this.store.dispatch(getTransactionList());
  }

  // Get logged in user details
  async getLoggedInUserDetails() {
    this.AuthService.getLogggedInUser()
  }




  ngOnInit() {
    this.onAppLoad()
    this.onGetTransactions()
  }
}
