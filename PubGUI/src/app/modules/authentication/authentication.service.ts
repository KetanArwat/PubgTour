import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { User } from 'src/app/modules/authentication/user';
import { EventEmitter } from 'events';

export const TOKEN_NAME: string = "jwt_token";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    authServiceEndpoint: string = "http://localhost:8082/user";
    token: string;
    decoded: any;

    @Output() 
    changeStatus = new EventEmitter;

    constructor(private http: HttpClient) { }


    registerUser(newUser) {
        const url = `${this.authServiceEndpoint}/register`;
        return this.http.post(url, newUser, { responseType: 'text' });
    }

    loginUser(user): Observable<any> {
        const url = `${this.authServiceEndpoint}/login`;
        return this.http.post(url, user);
    }

    setToken(token: string) {
        this.changeStatus.emit("true");
        return localStorage.setItem(TOKEN_NAME, token);
    }

    setUser(user: string){
        return localStorage.setItem("userId", user);
    }

    getToken() {
        return localStorage.getItem(TOKEN_NAME);
    }

    deleteToken() {
        localStorage.removeItem("userId")
        return localStorage.removeItem(TOKEN_NAME);
    }

    getTokenExpirationDate(token: string) {
        this.decoded = jwt_decode(token);
        if (this.decoded.exp === undefined) {
            return null;
        }
        const date = new Date(0);
        date.setUTCSeconds(this.decoded.exp);
        return date;
    }

    isTokenExpired(token?: string) {
        if (!token) {
            token = this.getToken();
        }
        if (!token) {
            return true;
        }
        const date = this.getTokenExpirationDate(token);
        if (date === undefined || date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }

}
