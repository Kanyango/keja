import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { Unit, UnDefs } from '../models/unit';
import { Tenant } from './tenant';
import { Payments } from '../payments/paymodel';

@Component({
    selector: 'tenants-component',
    templateUrl: './tenants.html'
})

export class TenantsComponent implements OnInit
{
    id = '';
    private tenantsUrl = 'http://localhost:8100/alltenants/'; 
    tenants: Tenant[];
    
    constructor(private fb: FormBuilder, 
                 private http: HttpClient,
                 private route: ActivatedRoute,
                 private location: Location, private httpService: HttpServices){}
                 
    ngOnInit()
    {
          this.id = this.route.snapshot.paramMap.get('id');
           this.getTenants();
    }
    
    getTenants()
    {
        const URL = `${this.tenantsUrl}${this.id}`;
        
        this.httpService.getTenants(URL)
        .subscribe(
           (data: Tenant[]) => {
             console.log(data);
             this.tenants = data;
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );   
    }
    
    updateVals(event)
     {
        this.tenants.push(event);
     }
     updateRent(event)
     {
        this.tenants.push(event);
     }

}