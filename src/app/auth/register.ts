import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//import { LocalStorageService } from 'angular-2-local-storage';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'register-component',
    templateUrl: './register.html'
})
 
export class RegisterComponent implements OnInit
{
    user: User
    registerForm: FormGroup;
    model: any = {};
   //@LocalStorage('username') public username:string; 
    loading = false;
    private registerUrl = 'http://localhost:8100/register/';
 
    constructor(private router: Router, private fb: FormBuilder, private http: HttpClient,
                 private route: ActivatedRoute,
                // private localStorageService: LocalStorageService,
                 private location: Location)
    {
       // this.createRegister();
    }
    
    ngOnInit()
    {
        this.user = {
          username: '',
          password: '',
          phone  : '',
          confirmPassword: ''
        }
    }
    createRegister()
    {
        this.registerForm = this.fb.group({
          username : ['', Validators.required],
          phone    : ['', Validators.required],
          password : ['', Validators.required]
        });
    }
    
 
    onSubmit() 
    {
        //console.log(this.registerForm.value);
        
        this.http.post(this.registerUrl, this.user, httpOptions)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    //this.alertService.success('Registration successful', true);
                    console.log(data);
                    //localStorage.setItem('keja-app', data.token);
                    this.router.navigate(['/login']);
                },
                error => {
                    
                    //this.alertService.error(error);
                    //this.loading = false;
                });
        
    }
}