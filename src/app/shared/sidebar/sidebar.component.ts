import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AppState } from 'src/app/core/store/app.state';
import { saveAccessToken, saveUserDetails } from 'src/app/core/store/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router, private AuthService:AuthService,  private store: Store<AppState>,){}


    // Get logged in user details
    async logoutUser() {
      this.AuthService.logoutUser().subscribe(
        // On success
        () =>{

          // Reset the user details and access token
          let userDetails = {}
          let access_token = ""
          this.store.dispatch(saveUserDetails({ userDetails }))
          this.store.dispatch(saveAccessToken({ access_token }))

          // Redirect back to login
          this.router.navigate(
            ['/accounts/login'],
            // { replaceUrl: true }
          );
         },

        //  on error
        () =>{
          this.router.navigate(
            ['/accounts/login'],
            { replaceUrl: true }
          );

         }
        );
    }



}
