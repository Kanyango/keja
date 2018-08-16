import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit, UnDefs } from '../models/unit';
import { Tenant } from '../tenants/tenant';
//import { Payments } from './paymodel';
import {Refund} from './refund';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
    selector: 'refunds-component',
    templateUrl: './refunds.html'
})

export class RefundsComponent implements OnInit
{
     id = '';
     private maintainUrl = 'https://kejaserver.herokuapp.com/refund';
     refunds: Refund[];
     
     constructor(private http: HttpClient,  private router: Router,
                 private route: ActivatedRoute, private httpService: HttpServices){}
     
     ngOnInit()
     {
        this.id = this.route.snapshot.paramMap.get('id');
        let id  = this.id;
        let url = `${this.maintainUrl}/${id}`;
        
        this.httpService.getRefund(url)
            .subscribe(
              (data: Refund[])=> {
                 
                 this.refunds = data;
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
     }
     
     updateVals(event)
     {
        this.refunds.push(event);
     }

}
