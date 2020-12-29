import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterationComponent implements OnInit {
  //userForm: FormGroup;
  error: BehaviorSubject<string>;

  userForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [
      Validators.required,
      this.passwordMatch
    ])
  }); 
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { console.log('userform', this.userForm); }
   
  passwordMatch(control: FormControl) {
    const password = control.root.get('password'); //original password
    console.log(password);
    return password && control.value !== password.value
    // control.value = repeatPassword and password.value = originalPassword
      ? {
          passwordMatch: true,
        }
      : null;
    // 1.check whether password field is not empty.
    // 2.matching password with repassword.
  } 
   
  ngOnInit(): void {
    this.error = new BehaviorSubject('');
  }

  register() {
    this.setError("");
    if (!this.userForm.valid) {
      return alert('Registeration Form Is Invalid.Please Fill Form Carefully.');
    }

    const user = this.userForm.getRawValue();   
    alert('Registeration Formr Is Valid');
   
    this.authService.register(user).subscribe((savedUser) => 
      //console.log('User Saved in DB Successfully.', savedUser)
      this.router.navigate(['/products']),
      (e) => this.setError(e)
    );
  }

  private setError(msg: any) {
    return this.error.next(msg);
  }

  get fullname() {
    return this.userForm.get('fullname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get repeatPassword() {
    return this.userForm.get('repeatPassword');
  }
  
  // get userControl() {
  //   return this.userForm.controls;
  // }
}

 // this.userForm = new FormGroup({
    //   fullName: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(2),
    //     Validators.maxLength(10),
    //   ]),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.maxLength(10),
    //   ]),
    //   repeatPassword: new FormControl('', [
    //     Validators.required,
    //     this.passwordMatch,
    //   ]),
    // });
  