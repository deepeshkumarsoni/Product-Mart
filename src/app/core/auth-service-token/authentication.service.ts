import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { User } from '@core/user';

interface UserDto{
  user : string;
  token : string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new Subject<User>();
  private apiUrl = '/api/auth/';

  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(email: string, password: string) {
    const loginCredential = { email, password };
    console.log('Login Credential', loginCredential);
    return this.httpClient
      .post<UserDto>(`${this.apiUrl}login`, loginCredential)
      .pipe(
        switchMap(({user,token}) => {
          this.setUser(user);
          this.tokenStorage.setToken(token);
          console.log('User Found Successfully', user);
          return of(user);
        }),
        catchError((error) => {
          console.log(
            `Your loggin detais could not be verified.
          Please try again.`,
            error
          );
          return throwError(
            `Your loggin detais could not be verified.
          Please try again.`
          );
        })
      );
    // return of(loginCredential); // Using Observable
  }

  logout() {
    // Removing token from localStorage
    this.tokenStorage.removeToken();
    // Removing user from Subject. 
    this.setUser(null);
    console.log('U have logout successfully');
  }

  get user() {
    return this.userSubject.asObservable();
  }

  register(userToSave: any) {
    //make api call to save user in database
    return this.httpClient.post<UserDto>(`${this.apiUrl}register`, userToSave)
    .pipe(
      switchMap(({ user, token }) => {
        this.setUser(user);
        this.tokenStorage.setToken(token);
        console.log('User Registered Successfuly');
        return of(user);
      }),
      // catchError is rxjs operator used for catching an error.
      catchError((error) => {
        console.log('Server error occured', error);
        // throwError is an rxjs operator which return an observable.
        return throwError('Registeration failed please contact to admin');
      })
    );

    // this.setUser(user); // update user subject
    // console.log(user);
    // return of(user);
  }

  // For Refresh Page
  findMe() {
    const token = this.tokenStorage.getToken();
    if (!token) {
      return EMPTY;
    }
    this.httpClient.get<User>(`${this.apiUrl}findme`).pipe(
      switchMap((foundUser) => {
        this.setUser(foundUser);
        console.log('User Found Successfully', foundUser);
        return of(foundUser);
      }),
      catchError((error) => {
        console.log(
          `Your loggin detais could not be verified.
          Please try again.`,
          error
        );
        return throwError(
          `Your loggin detais could not be verified.
          Please try again.`
        );
      })
    );
  }

  private setUser(user) {
    this.userSubject.next(user);
  }
}
