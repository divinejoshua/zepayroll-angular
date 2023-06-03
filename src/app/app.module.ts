import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { LoginComponent } from './pages/accounts/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
