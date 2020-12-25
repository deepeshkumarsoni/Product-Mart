import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  error: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
    });
  }

  ngOnInit(): void {
    this.error = new BehaviorSubject('');
  }

  get userControl() {
    return this.userForm.controls;
  }

  login() {
    //this.setError("");
    if (this.userForm.valid) {
      this.authService
        .login(
          this.userForm.get('email').value,
          this.userForm.get('password').value
        )
        .subscribe(
          (s) => this.router.navigate(['/products']),
          (e) => (this.setError = e)
        );
      this.userForm.reset();
    } else {
      alert('Login Form Invalid');
    }
  }

  private setError(msg: any) {
    return this.error.next(msg);
  }
}

//login() {
// this.authService
//   .login(this.email, this.password)
//   .subscribe((s) => console.log(s));  // Subscribed Observable
// this.router.navigate(['']);
//}
