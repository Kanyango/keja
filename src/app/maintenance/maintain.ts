import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { ActivatedRoute, Router } from '@angular/router';
import { Maintain } from './maint';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
    selector: 'maintain-component',
    templateUrl: './maintain.html'
})

export class MaintenanceComponent implements OnInit
{
     id = '';
     private maintainUrl = 'http://localhost:8100/maintain';
     maintains: Maintain[];
     
     constructor(private http: HttpClient,  private router: Router,
                 private route: ActivatedRoute, private httpService: HttpServices){}
     
     ngOnInit()
     {
        this.id = this.route.snapshot.paramMap.get('id');
        let id  = this.id;
        let url = `${this.maintainUrl}/${id}`;
        
        this.httpService.getMaintain(url)
            .subscribe(
               (data : Maintain[]) => {
                 
                 this.maintains = data;
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
     }
     
     updateVals(event)
     {
        this.maintains.push(event);
     }

}