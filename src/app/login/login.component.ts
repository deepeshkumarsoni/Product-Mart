import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm : FormGroup
  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.userForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {}

  get userControl(){
    return this.userForm.controls;
  }

  login(){
    if(this.userForm.valid){
      alert('User Loggin Successfully');
      this.userForm.reset();
      this.router.navigate(['']);
    }
    else{
      alert('User Form Invalid');
    }
  }

  //login() {
    // this.authService
    //   .login(this.email, this.password)
    //   .subscribe((s) => console.log(s));  // Subscribed Observable
    // this.router.navigate(['']);
  //}
}
