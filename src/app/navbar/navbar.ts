import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.services';


@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.html'
})

export class NavbarComponent
{
    @Input() id: any;
    
    constructor(private authenticationService: AuthenticationService){}
    
    logout()
    {
        this.authenticationService.logout();
        
    }
    

}