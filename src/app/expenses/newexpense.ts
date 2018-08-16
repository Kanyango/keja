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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'newexpenses-component',
    templateUrl: './newexpense.html'
})

export class NewExpensesComponent implements OnInit
{
   @Input() id: any;
   @Output('update') change: EventEmitter<any> = new EventEmitter<any>();
   modalRef: NgbModalRef;
   expenseForm: FormGroup;
   closeResult: string;
   private expUrl = 'https://kejaserver.herokuapp.com/expense';
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, 
                    private http: HttpClient,
                    private route: ActivatedRoute,
                     private httpService: HttpServices,
                    private ngbDateParserFormatter: NgbDateParserFormatter)
   {
     this.creatExpense();
   }
   
   ngOnInit()
   {
      this.id = this.route.snapshot.paramMap.get('id');
   }
   creatExpense()
   {
      this.expenseForm = this.fb.group({
          title: ['', Validators.required],
          amount: ['', Validators.required],
          paid_to: ['', Validators.required],
          expense_date: ['', Validators.required]
        });
   }
   
   onSubmit()
   {
            //const url = `${this.apartsUrl}/${id}`;
        let ngbDate = this.expenseForm.controls['expense_date'].value;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        
        this.expenseForm.value.expense_date = myDate;
        
        this.expenseForm.value.apartment = this.id;
        
        console.log(this.expenseForm.value);
        
        let URL = `${this.expUrl}/${this.id}`
        this.httpService.createExpense(this.expUrl, this.expenseForm.value)
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
