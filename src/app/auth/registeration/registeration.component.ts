import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/index';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss'],
})
export class RegisterationComponent implements OnInit {
  userGroup: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.userGroup = new FormGroup({
      fullName: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.passwordMatch
      ]),
    });
  }

  ngOnInit(): void {}

  register() {
    if (!this.userGroup.valid) {
      return alert('Registeration Form Is Invalid.Please Fill Form Carefully.');
    }
    const user = this.userGroup.value;
    alert('Registeration Done Successfully');
    this.authService
      .register(user)
      .subscribe((savedUser) => {
        console.log("User Saved in DB Successfully.",savedUser);
        this.router.navigate(['products'])
      });
  }

  passwordMatch(confirmPassword: FormControl) {
    const password = confirmPassword.root.get('password');
    console.log(password);
    return password && confirmPassword.value !== password.value?
    { 
      passwordMatch: true 
    }: null;
    // 1.check whether password field is not empty.
    // 2.matching password with repassword.
  }

  get userControl() {
    return this.userGroup.controls;
  }

  // get fullName(){
  //   return this.userGroup.get('fullName');
  // }
  // get email(){
  //   return this.userGroup.get('email');
  // }
  // get password(){
  //   return this.userGroup.get('password');
  // }
  // get confirmPassword(){
  //   return this.userGroup.get('confirmPassword');
  // }
}
