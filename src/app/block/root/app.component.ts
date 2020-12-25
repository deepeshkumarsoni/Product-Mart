import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@core/index';
import { User } from '@core/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  title = 'product-mart';
  user: User;
  userUnsubscribe: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router){    
      
   // For Refresh Page
    this.authService.findMe().subscribe(user => this.user = user);
    
    this.authService.user.subscribe(user => this.user = user);

  }

  get userFullName() {
    return this.user.fullName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  //ngOnDestroy(): void {
  //  if (this.userUnsubscribe) {
   //   this.userUnsubscribe.unsubscribe();
   // }
 // }
}
