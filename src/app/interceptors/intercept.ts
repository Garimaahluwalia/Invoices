import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTHORIZATION_TOKEN } from '../constants';
import endpoints from '../endpoints';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem(AUTHORIZATION_TOKEN)
        // console.log(authToken, "authToken")
        if (!request.url.includes(endpoints.LOGIN)) {
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            return next.handle(modifiedRequest);
        }
        return next.handle(request);
    }
}
