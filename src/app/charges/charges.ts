import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { Charges } from './charge';
import { Unit } from '../models/unit';

@Component({
    selector: 'charges-component',
    templateUrl: './charges.html'
})

export class ChargesComponent implements OnInit
{
    id = '';
    term = '';
    
    private chargesUrl = 'http://localhost:8100/charges/'; 
    charges: Array<Charges>;
    
    constructor(private fb: FormBuilder, 
                 private http: HttpClient,
                 private route: ActivatedRoute,
                 private location: Location, private httpService: HttpServices)
                 {
                
                 }
                 
    ngOnInit()
    {
          this.id = this.route.snapshot.paramMap.get('id');
           this.getCharges();
    }
    
    getCharges()
    {
        const URL = `${this.chargesUrl}${this.id}`;
        
        this.httpService.getCharges(URL)
        .subscribe(
           (data: Charges[]) => {
             console.log(data);
             this.charges = data;
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );   
    }
    
    updateVals(event)
     {
        this.charges.push(event);
     }

}