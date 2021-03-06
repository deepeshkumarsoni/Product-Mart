import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { AuthenticationService } from '@core/index';
import { User } from '@core/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'product-mart';
  user$: Observable<User>;
  
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = merge(this.authService.findMe(), this.authService.user);
  }  
    // this.user = this.authService.user;
    // // For Refresh Page
    // this.userSubscription = this.authService
    //   .findMe()
    //   .subscribe((user) => (this.user = user));
  

  get userFullName() {
    return this.user$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  // ngOnDestroy(): void {
  //   if (this.userSubscription) {
  //     this.userSubscription.unsubscribe();
  //   }
  // }
}
