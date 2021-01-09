import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/index';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: BehaviorSubject<string>;

  constructor(private router: Router, private authService: AuthenticationService) {}


  ngOnInit(): void {
    this.error = new BehaviorSubject('');
  }

  login() {
    this.setError("");
    this.authService.login(this.email, this.password).subscribe(
      (redirectUrl) => this.router.navigate([redirectUrl]),
      (e) => this.setError(e)
    );   
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


 // this.setError("");
    // this.authService
    //     .login(this.email,this.password)
    //     .subscribe(
    //       (s) => this.router.navigate(['/products']),
    //       (e) => (this.setError = e)
    //     );
    //   this.userForm.reset();
    // } else {
    //   alert('Login Form Invalid');
    // }