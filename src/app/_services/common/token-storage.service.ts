import { Injectable } from '@angular/core';
import { LoggedInUserModel } from '../../_models/loggedinusermodel';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})

export class TokenStorageService {

    constructor() { }

    signOut() {
        window.localStorage.clear();
    }

    public saveToken(token: string) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user) {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): LoggedInUserModel {
        var user: LoggedInUserModel =  JSON.parse(window.localStorage.getItem(USER_KEY));
        return user;
    }

    public hasValidRole(rolesToCheck: string[]): boolean {
    	// No roles defined so return true
        if(rolesToCheck == undefined || rolesToCheck.length == 0) {
            return true;
        }
        var isValidRoleFound = false;
        this.getUser().roles.forEach(role => {
            if (!isValidRoleFound && rolesToCheck.indexOf(role) >= 0 ) {
                isValidRoleFound = true;
                return;
            }
        });
        return isValidRoleFound;
    }
}
