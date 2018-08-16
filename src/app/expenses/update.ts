import { Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateParserFormatter, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
    selector: 'update-component',
    templateUrl: './update.html'
})

export class UpadateExpensesComponent implements OnInit
{
   @Input() id: any;
   @Output('edit') change: EventEmitter<any> = new EventEmitter<any>();
   @Input() one: Expense;
   
   updatExpenseForm: FormGroup;
   closeResult: string;
   private expUrl = 'http://localhost:8100/expense';
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, 
                    private http: HttpClient,
                    private modalRef: NgbModalRef,
                    private route: ActivatedRoute,
                     private httpService: HttpServices,
                    private ngbDateParserFormatter: NgbDateParserFormatter)
   {
     
   }
   
   ngOnInit()
   {
      this.id = this.route.snapshot.paramMap.get('id');
      this.creatExpense();
   }
   creatExpense()
   {
      this.updatExpenseForm = this.fb.group({
          title: [this.one.title, Validators.required],
          amount: [this.one.amount, Validators.required],
          paid_to: [this.one.paid_to, Validators.required],
          expense_date: [this.one.expense_date, Validators.required]
        });
   }
   
   onSubmit()
   {
            //const url = `${this.apartsUrl}/${id}`;
        let ngbDate = this.updatExpenseForm.controls['expense_date'].value;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        
        this.updatExpenseForm.value.expense_date = myDate;
        
        this.updatExpenseForm.value.apartment = this.id;
        
        console.log(this.updatExpenseForm.value);
        
        let URL = `${this.expUrl}/${this.one._id}`
        this.httpService.updateExpense(URL, this.updatExpenseForm.value)
            .subscribe(
               data => {
                 console.log(data);
                 this.change.emit(data);
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
            
            this.modalRef.close();
    }
    
  open(content) {
    this.modalRef = this.modalService.open(content, {size: 'lg'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}