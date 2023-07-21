import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTransactionList } from 'src/app/core/store/transactions/transactions.actions';
import { AppState } from './core/store/app.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zepayroll-angular';
  initialLoading : boolean = true;

  constructor(private store: Store<AppState>){}

  onAppLoad (){
     // Terminate the loader
     setTimeout(() => this.initialLoading = false, 2000);
  }

  onGetTransactions() {
    // Get transactions list from store
    this.store.dispatch(getTransactionList());
  }

  getLoggedInUserDetails() {
    // Get transactions list from store
    this.store.dispatch(getTransactionList());
  }


  ngOnInit() {
    this.onAppLoad()
    this.onGetTransactions()
    this.getLoggedInUserDetails()
  }
}
