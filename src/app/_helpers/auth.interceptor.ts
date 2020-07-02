import { TokenStorageService } from '../_services/common/token-storage.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SteadyError } from '../_models/steadyerror';

const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_BEARER_KEY = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, TOKEN_BEARER_KEY + token)});
        }
        return next.handle(authReq).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.token.signOut();
                //location.reload(true); //This won't allow user to see error message on login page if user enter wrong username/password.
            }

            var steadyError = new SteadyError;
            const errorMessage = err.error.detail || err.error.error || err.statusText;
            steadyError.errorMessage = errorMessage;
            if(err.error.invalidParams) {
                steadyError.invalidParams = err.error.invalidParams;
            }
            return throwError(steadyError);
        }));
    }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
