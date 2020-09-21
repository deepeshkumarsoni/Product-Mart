import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

email: string;
password: string;

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {}

  login(){
    this.authService.login(this.email, this.password)
    .subscribe(s => console.log(s));
    this.router.navigate(['']);
  }
}
