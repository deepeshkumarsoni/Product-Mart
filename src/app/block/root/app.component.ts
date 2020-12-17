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
export class AppComponent implements OnDestroy {
  title = 'product-mart';
  user: User;
  userUnsubscribe: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router){    
    // For Refresh Page
    //this.authService.findMe().subscribe(user => (this.user = user));
    
    this.userUnsubscribe = this.authService.user.subscribe(
      (item) => (this.user = item)
    );
  }

  get userFullName() {
    return this.user.fullName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if (this.userUnsubscribe) {
      this.userUnsubscribe.unsubscribe();
    }
  }
}
