import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { HttpServices } from '../services/httpservices';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'apartments-component',
    templateUrl: './apartments.html'
})

export class ApartmentsComponent implements OnInit
{
     apartments: any = [];
     private apartsUrl = 'https://kejaserver.herokuapp.com/unit';
     constructor(private http: HttpClient, private httpService: HttpServices){}
     
    ngOnInit()
    {
       // let authToken = localStorage.getItem('keja-app');
        //let headers = new HttpHeaders({ 'Accept': 'application/json' });
        //headers.append('Authorization', `Bearer ${authToken}`);

        //let options = new RequestOptions({ headers: headers });

        
          this.httpService.getAllAparts()
            .subscribe(
               data => {
                 console.log(data);
                 this.apartments = data;
               },
               error => {
                 console.error("Error saving food!", error);
                 return Observable.throw(error);
               }
            );
    }
     
     updateAparts(event)
     {
     
        this.apartments.push(event);
        
     }
     
}
