import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './core/store/counter/counter.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/accounts/login/login.component';
import { RegisterComponent } from './pages/accounts/register/register.component';
import { SharedModule } from './shared/shared.module';
import { PayoutsComponent } from './pages/payouts/payouts.component';
import { PayoutdetailsComponent } from './pages/payoutdetails/payoutdetails.component';
import { BlankComponent } from './pages/blank/blank.component';
import { TestComponent } from './pages/test/test.component';
import { transactionsReducer } from './core/store/transactions/transactions.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PayoutsComponent,
    PayoutdetailsComponent,
    BlankComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({ counter: counterReducer, transactions: transactionsReducer  }),
    // StoreModule.forRoot(reducers, { metaReducers }),
    // StoreModule.forRoot(reducers, {
    //   metaReducers
    // })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
