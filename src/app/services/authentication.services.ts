import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    
    private loginUrl = 'http://localhost:8100/login';
    
    constructor(private http: HttpClient, private router: Router) { }
 
    login(username: string, password: string) {
        return this.http.post(this.loginUrl, { username: username, password: password })
            .map((token: any) => {
                // login successful if there's a jwt token in the response
                if (token) {
                    
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('keja-app', token);
                }
                return token;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('keja-app');
        this.router.navigate(['/apartments']);
    }
}