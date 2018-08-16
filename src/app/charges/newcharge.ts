import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateParserFormatter, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { ActivatedRoute, Router } from '@angular/router';
import { Charges } from './charge';
import { Unit } from '../models/unit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'newcharge-component',
    templateUrl: './newcharge.html'
})

export class NewChargesComponent implements OnInit
{
   @Input() id: any;
   @Output('update') change: EventEmitter<any> = new EventEmitter<any>();
   
   chargesForm: FormGroup;
   closeResult: string;
   units: Unit[];
   
   private chargeUrl = 'https://kejaserver.herokuapp.com/charges';
   private unitsUrl = 'https://kejaserver.herokuapp.com/unit/';
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, 
                    private http: HttpClient,
                    private route: ActivatedRoute,
                    private modalRef: NgbModalRef,
                     private httpService: HttpServices,
                    private ngbDateParserFormatter: NgbDateParserFormatter)
   {
     this.creatCharge();
   }
   
   ngOnInit()
   {
    this.getUnits()
   }
   
    getUnits()
       {
        let id = this.id;

         let url = `${this.unitsUrl}${id}`;
            this.httpService.getUnits(url)
            .subscribe(
               (data: Unit[]) => {
                 console.log('All units',data);
                 this.units = data;
                 this.change.emit(data);
               },
               error => {
                 console.error("Error saving food!", error);
                 return Observable.throw(error);
               }
            );   
       }
       
   creatCharge()
   {
      this.chargesForm = this.fb.group({
          description : ['', Validators.required],
          amount      : ['', Validators.required],
          house       : ['', Validators.required],
          month       : ['', Validators.required],
          paid        : ['', Validators.required]
        });
   }
   
   onSubmit()
   {
   
        this.chargesForm.value.balance = parseInt(this.chargesForm.value.amount) - parseInt(this.chargesForm.value.paid)
            //const url = `${this.apartsUrl}/${id}`;
        let ngbDate = this.chargesForm.controls['month'].value;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        
        this.chargesForm.value.month = myDate;
        
        this.chargesForm.value.apartment = this.id;
        
        console.log(this.chargesForm.value);
        
        let URL = `${this.chargeUrl}/${this.id}`
        this.httpService.createCharge(this.chargeUrl, this.chargesForm.value)
            .subscribe(
               data => {
                 console.log(data);
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
