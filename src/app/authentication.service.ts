import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new Subject<User>();

  constructor() {}

  login(email: string, password: string) {
    const loginCredential = { email, password };
    console.log('Login Credential', loginCredential);
    return of(loginCredential); // Using Observable
  }
  logout(){
    this.setUser(null);
    console.log('U have logout successfully');
  }
  get user() {
    return this.userSubject.asObservable();
  }
  register(user: any) {
    //make api call to save user in database
    this.setUser(user); // update user subject
    console.log(user);
    return of(user);
  }
  private setUser(user) {
    this.userSubject.next(user);
  }
}
