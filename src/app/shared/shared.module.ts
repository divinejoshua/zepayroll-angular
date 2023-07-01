import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CreatePayoutComponent } from './create-payout/create-payout.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    CreatePayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    CreatePayoutComponent,
  ]
})
export class SharedModule { }
