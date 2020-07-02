import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenStorageService } from '../_services/common/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorageService: TokenStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.tokenStorageService.getUser();
        if (currentUser) {
           if(!this.tokenStorageService.hasValidRole(route.data.roles)) {
               // not authorised user to access the page, so redirect to home page
               this.router.navigate(['/']);
               return false;
            }
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}