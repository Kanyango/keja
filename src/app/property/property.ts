import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';


@Component({
    selector: 'property-component',
    templateUrl: './property.html'
})

export class PropertyHeaderComponent implements OnInit
{
    id = '';
    apartment = {};
    
    private apartsUrl  = 'http://localhost:8100/unit';
    
    constructor(private httpService: HttpServices,
                private router: Router,
                private route: ActivatedRoute){}
    
    ngOnInit()
    {
        let tot_rent = 0;
        
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
        
        let URL = `${this.apartsUrl}/${this.id}`;
        
        this.httpService.getUnit(URL)
            .subscribe(
               data => {
                 console.log(data);
                 this.apartment = data;
                 
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
            
    }
    
    
    
}