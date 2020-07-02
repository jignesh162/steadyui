import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from '../_services/common/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(
           finalize(() => this.loaderService.hide())
        );
    }
}

export const loaderInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }];