import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showPassword: boolean = false;
  validationActive: boolean = false;
  animateErrorBtn: boolean = false;
  isLoading: boolean = false;
  // loginForm : FormGroup;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] ),
    username: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z1-9_-]+$")] ),
    password:  new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator()] ),

  } );


  // constructor
  constructor( public formBuilder: FormBuilder){
      // Form group

  }

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
      }, 2000);

    }
  }
}


// Confirm password validator
export function confirmPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password  = control.get('password');
    let confirmPassword = control.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  };
}
