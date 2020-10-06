import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy{
  title = 'product-mart';
  user: User;
  userUnsubscribe: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.userUnsubscribe = this.authService.user.subscribe(
      (item) => this.user === item
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnDestroy():void{
    if(this.userUnsubscribe){
      this.userUnsubscribe.unsubscribe();
    }
  }
}
