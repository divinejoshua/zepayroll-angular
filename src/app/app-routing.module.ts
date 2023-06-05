import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PayoutComponent } from './pages/payout/payout.component';
import { LoginComponent } from './pages/accounts/login/login.component';
import { RegisterComponent } from './pages/accounts/register/register.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', title: 'Home - Zepayroll', component: HomeComponent },
  { path: 'payout', title: 'Payout - Zepayroll', component: PayoutComponent },

  { path: 'accounts/login', title: 'Login - Zepayroll', component: LoginComponent },
  { path: 'accounts/register', title: 'Register - Zepayroll', component: RegisterComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
