import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { Payments } from './paymodel';
import { Tenant } from '../tenants/tenant';

@Component({
    selector: 'payments-component',
    templateUrl: './payments.html'
})

export class PaymentsComponent implements OnInit
{
    payments: Payments[];
    id = '';
    tenants: Tenant[];
    private tenantsUrl = 'http://localhost:8100/alltenants/'; 
    
    constructor(private fb: FormBuilder, 
                 private http: HttpClient,
                 private route: ActivatedRoute,
                 private httpService: HttpServices,
                 private location: Location){}
                 
    private payUrl = 'http://localhost:8100/allpayments'; 
     
    ngOnInit()
    {
           this.id = this.route.snapshot.paramMap.get('id');
           this.getTenant();
    }
    
     getTenant()
        {
            const URL = `${this.tenantsUrl}${this.id}`;

            this.httpService.getTenants(URL)
            .subscribe(
               (data: Tenant[]) => {
                 console.log('one tenants', data);
                 this.tenants = data;
                  this.getPayments(this.tenants);  
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );   
        }
    
    getPayments(tenants)
    {
        const URL = `${this.payUrl}/${this.id}`;
        
        this.httpService.getPayments(URL)
        .subscribe((data: Payments[]) => {
             console.log(data);
             let payments = data;
             
             console.log('Ma tenant', this.tenants);
             for(let n = 0; n < tenants.length; n++)
             {
                for(let i = 0; i < data.length; i++)
                {
                    console.log('Tenants falsy',tenants[n]._id == data[i].tenant);
                    if(tenants[n]._id == data[i].tenant)
                    {   
                        data[n].tenant = tenants[n].tenant_name;
                    }
                    
                }
                
            }
            console.log('Payments names', this.payments);
            
            this.payments = data;
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );   
    }
    
    updateVals(event)
     {
        this.payments.push(event);
     }
     
     updateRent(event)
     {
        this.payments.push(event);
     }
}