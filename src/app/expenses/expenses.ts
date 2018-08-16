import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from './exp';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
    selector: 'expenses-component',
    templateUrl: './expenses.html'
})

export class ExpensesComponent implements OnInit
{
    id = '';
     private expUrl = 'http://localhost:8100/allexpense';
     expenses: Expense[];
     
     constructor(private http: HttpClient,  private router: Router,
                 private route: ActivatedRoute, private httpService: HttpServices){}
     
     ngOnInit()
     {
        this.id = this.route.snapshot.paramMap.get('id');
        let id  = this.id;
        let url = `${this.expUrl}/${id}`;
        
        this.httpService.getExpenses(url)
            .subscribe(
               (data: Expense[]) => {
                 this.expenses = data;
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
     }
     
     updateVals(event)
     {
        this.expenses.push(event);
     }
     
     updateEdit(event)
     {
        this.expenses.push(event);
     }

}