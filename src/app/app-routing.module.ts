import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { LoginComponent } from './pages/accounts/login/login.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home - Zepayroll', component: HomeComponent },
  { path: 'payout', title: 'Payout - Zepayroll', component: PayoutComponent },
  { path: 'accounts/login', title: 'Payout - Zepayroll', component: LoginComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
