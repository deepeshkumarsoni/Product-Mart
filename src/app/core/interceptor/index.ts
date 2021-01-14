import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { headerInterceptorService } from './header-interceptor.service';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: headerInterceptorService,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true,
  },
];
