import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { saveAccessToken } from 'src/app/core/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    showPassword: boolean = false;
    validationActive: boolean = false;
    animateErrorBtn: boolean = false;
    isLoading: boolean = false;
    successMessage: string = ""
    isServerError: boolean = false;
    ServerErrorMessage: string = "";

    // Form group
    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password:  new FormControl('', [Validators.required]),


    });

    constructor(private router: Router, private AuthService:AuthService, public store: Store<AppState>){}

    // onSubmit form
    onSubmit() :void {

      this.validationActive = true

      // if form is invalid
      if(this.loginForm.invalid){
        this.animateErrorBtn = true,

        setTimeout(() => {
          this.animateErrorBtn = false
          this.isLoading = false
        }, 300);

      } else{

        // If form is valid , Send the Rquest to the server
        this.isLoading = true;
        this.sendLoginRequest(this.loginForm.value)



      }
    }

    // Send login request to server
        sendLoginRequest(bodyParams: any) {
          try {

            // Reset values to default upon every request
            this.successMessage = ""
            this.ServerErrorMessage = ""
            this.isServerError = false



            // asynchronous operation
            this.AuthService.sendLoginCredentials(bodyParams).subscribe(
              //Success
              (response: any) => {
                this.successMessage = "Login successful";
                this.isLoading = false;

                //Save the access token to auth store
                let access_token = response.access_token
                this.store.dispatch(saveAccessToken({ access_token }));


                // Move to home page
                this.router.navigate(
                  ['/home'],
                  { replaceUrl: true }
                );

              },

              // Error
              (error: any) => {
                //Set the new values
                this.isLoading = false;
                this.isServerError = true;

                // Check error type to determine the error message
                if (error.status == 400) {
                  this.ServerErrorMessage = error.error.non_field_errors; //This is the error message from the server
                } else {
                  this.ServerErrorMessage = "An error occurred";
                }

                // Add Animation to button upon any errors
                this.animateErrorBtn = true,
                  setTimeout(() => {
                    this.animateErrorBtn = false;
                    this.isLoading = false;
                  }, 300);

              }
            )
          }

          finally {
              // this will always get executed
          }

        }

}


