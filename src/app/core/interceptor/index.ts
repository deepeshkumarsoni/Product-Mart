import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { headerInterceptorService } from "./header-interceptor.service";


export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: headerInterceptorService,
        multi: true
    }
];

