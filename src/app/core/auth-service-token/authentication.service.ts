import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { User } from '@core/user';
import { LogService } from '@core/log.service';

interface UserDto{
  user : User;
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
    private tokenStorage: TokenStorageService,
    private logService: LogService
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
        catchError((e) => {
          this.logService.log(`Server Error Occurred: ${e.error.message} `, e);
          return throwError(
            `Your loggin detais could not be verified.Please try again.`
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
      catchError((e) => {
        this.logService.log(`Server Error Occurred `, e);
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
    return this.httpClient.get<any>(`${this.apiUrl}findme`).pipe(
      switchMap((user) => {
        this.setUser(user);
        console.log('User Found Successfully', user);
        return of(user);
      }),
      catchError((error) => {
        this.logService.log(`Your loggin detais could not be verified.Please try again.`,error);        
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
