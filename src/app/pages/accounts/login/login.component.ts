import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    // Form group
    loginForm = new FormGroup({
      name:  new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email] )
    });

    constructor(){}


    // onSubmit form
    onSubmit() :void {
      console.log(this.loginForm.value)
    }

}
