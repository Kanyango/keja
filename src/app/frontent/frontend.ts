import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.services';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
    selector: 'frontend-component',
    templateUrl: './frontend.html'
})

export class FrontendComponent
{
    constructor(private router: Router) { }
    
    toRegister()
    {
      this.router.navigate(['/apartments']);
    }

}