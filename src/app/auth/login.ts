import { Component, OnInit , AfterViewInit, ElementRef} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.services';

@Component({
    selector: 'login-component',
    templateUrl: './login.html'
})

export class LoginComponent implements OnInit
{
    model: any = {};
    loading = false;
    returnUrl: string
    loginForm: FormGroup;
    private scope = [
    'profile',
    'email'].join(' ');
  
    private clientId:string = '324793517486-3koaibnp8dph5tugol3qaf1b8e7od11k.apps.googleusercontent.com';
   
  
   constructor(private fb: FormBuilder, 
                private element: ElementRef,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService)
   {
     this.creatLogin();
   }
   
   

   
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
   
   creatLogin()
   {
      this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
   }
   
    login() {
        //this.loading = true;
        
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['/apartments']);
                },
                error => {
                    //this.loading = false;
                });
    }
   
  
}