import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
[x: string]: any;

  showPassword: boolean = false;
  validationActive: boolean = false;
  animateErrorBtn: boolean = false;
  isLoading: boolean = false;

  loginForm : FormGroup;

  error_messages = {

    'username': [
      { type: 'required', message: 'Userame is required.' },
      { type: 'pattern', message: 'Username must contain only [^[A-Za-z1-9_-]+$]' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Invalid email ' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'pattern', message: 'Password must have uppercase, lowercase and number.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm password is required.' },
    ],
  }

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^[A-Za-z1-9_-]+$")
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    }, {
      validators: this.confirmPasswordValidation.bind(this)
    });
  }




  // Password match function
  //NOTE: Custom validations neeed their own messages on the html template
  confirmPasswordValidation(formGroup: FormGroup) {
    const password  = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
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

