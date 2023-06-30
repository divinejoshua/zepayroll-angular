import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

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

    // Form group
    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password:  new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]),
    });

    constructor(private router: Router){}

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

        // If form is valid
        this.isLoading = true;

        setTimeout(() => {
          this.isLoading = false
          console.log(this.loginForm.value);

          this.router.navigate(
            ['/home'],
          );


        }, 2000);

      }
    }

}


