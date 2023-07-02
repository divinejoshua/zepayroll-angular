import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PayoutsComponent } from './pages/payouts/payouts.component';
import { LoginComponent } from './pages/accounts/login/login.component';
import { RegisterComponent } from './pages/accounts/register/register.component';
import { PayoutdetailsComponent } from './pages/payoutdetails/payoutdetails.component';
import { BlankComponent } from './pages/blank/blank.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home - Zepayroll', component: HomeComponent },
  { path: 'payouts', title: 'Payout - Zepayroll', component: PayoutsComponent },
  { path: 'payouts/:payoutId', title: 'Payout - Zepayroll', component: PayoutdetailsComponent },

  { path: 'accounts/login', title: 'Login - Zepayroll', component: LoginComponent },
  { path: 'accounts/register', title: 'Register - Zepayroll', component: RegisterComponent },


  { path: 'blank', title: 'Blank - Zepayroll', component: BlankComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
