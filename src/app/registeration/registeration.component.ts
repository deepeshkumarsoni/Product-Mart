import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

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
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        this.passwordMatch,
      ]),
    });
  }

  ngOnInit(): void {}

  register() {
    if(!this.userGroup.valid){
      return
    }
    const user = this.userGroup.value;
    this.authService
      .register(user)
      .subscribe((s) => this.router.navigate(['Home']));
  }
  passwordMatch(rePaswordcontrol: FormControl) {
    const password = rePaswordcontrol.root.get('password');
    return password && rePaswordcontrol.value !== password.value
    // 1.check whether password field is not empty.
    // 2.matching password with repassword.
      ? { passwordMatch: true }
      : null;
  }
  get fullName(){
    return this.userGroup.get('fullName');
  }
  get email(){
    return this.userGroup.get('email');
  }
  get password(){
    return this.userGroup.get('password');
  }
  get repassword(){
    return this.userGroup.get('repassword');
  }
}
