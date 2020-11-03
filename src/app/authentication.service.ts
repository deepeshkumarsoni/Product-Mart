import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new Subject<User>();
  private apiUrl = '/api/auth/';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const loginCredential = { email, password };
    console.log('Login Credential', loginCredential);
    return of(loginCredential); // Using Observable
  }
  logout() {
    this.setUser(null);
    console.log('U have logout successfully');
  }
  get user() {
    return this.userSubject.asObservable();
  }
  register(user: any) {
    //make api call to save user in database
    return this.
    httpClient.
    post(`${this.apiUrl}register`, user).pipe
    (
      switchMap(savedUser => {
        this.setUser(savedUser);
        return of(savedUser);
      }),
      // catchError is rxjs operator used for catching an error.
      catchError(error => {
        console.log('Server error occured',error);
        // throwError is an rxjs observable which return an observable.
         return throwError('Registeration failed please contact to admin');
      })
    );

    // this.setUser(user); // update user subject
    // console.log(user);
    // return of(user);
  }
  private setUser(user) {
    this.userSubject.next(user);
  }
}
