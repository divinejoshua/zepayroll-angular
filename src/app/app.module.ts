import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/accounts/login/login.component';
import { RegisterComponent } from './pages/accounts/register/register.component';
import { SharedModule } from './shared/shared.module';
import { PayoutsComponent } from './pages/payouts/payouts.component';
import { PayoutdetailsComponent } from './pages/payoutdetails/payoutdetails.component';
// import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PayoutsComponent,
    PayoutdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
