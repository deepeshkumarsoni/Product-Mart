import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(email: string, password: string){
    const loginCredential = {email, password};
    console.log('Login Credential', loginCredential);
    return of(loginCredential);
  }
}
