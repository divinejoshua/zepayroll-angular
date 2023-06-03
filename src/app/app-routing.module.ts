import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PayoutComponent } from './pages/payout/payout.component';


const routes: Routes = [
  { path: 'home', title: 'Home page', component: HomeComponent },
  { path: 'payout', title: 'Payout', component: PayoutComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
