import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth-service-token/token-storage.service';

@Injectable()

export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor( private tokenStorage: TokenStorageService ) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
    
    console.log('Auth Intercept Provider');
    console.log(req.url);
   
    const token = this.tokenStorage.getToken();
    
    const clonedRequest = req.clone({
      setHeaders:{ Authorization: token }
    });
    return next.handle(clonedRequest);
  }
}
 