import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    showPassword: boolean = false;

    // Form group
    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password:  new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]),
    });

    constructor(){}


    // onSubmit form
    onSubmit() :void {
      console.log(this.loginForm.value)
      console.log(this.loginForm.controls.email.errors?.['required'])
    }

}


