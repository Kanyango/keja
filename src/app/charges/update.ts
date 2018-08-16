import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbDateParserFormatter, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { ActivatedRoute, Router } from '@angular/router'
import { Unit } from '../models/unit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'updatecharge-component',
    templateUrl: './update.html'
})

export class UpdateChargesComponent implements OnInit
{
   @Input() id: any;
   @Input() one;
   @Output('editCharge') change: EventEmitter<any> = new EventEmitter<any>();
   
   updatechargesForm: FormGroup;
   closeResult: string;
   units: Unit[];
   modalRef: NgbModalRef;
   private chargeUrl = 'https://kejaserver.herokuapp.com/charges';
   private unitsUrl = 'https://kejaserver.herokuapp.com/unit/';
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, 
                    private http: HttpClient,
                    private route: ActivatedRoute,
                     private httpService: HttpServices,
                    private ngbDateParserFormatter: NgbDateParserFormatter)
   {
     
   }
   
   ngOnInit()
   {
    this.getUnits();
    this.creatCharge();
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
      this.updatechargesForm = this.fb.group({
          description : [this.one.description, Validators.required],
          amount      : [this.one.amount, Validators.required],
          house       : [this.one.house, Validators.required],
          month       : [this.one.month, Validators.required],
          paid        : [this.one.paid, Validators.required]
        });
   }
   
   onSubmit()
   {
   
        this.updatechargesForm.value.balance = parseInt(this.updatechargesForm.value.amount) - parseInt(this.updatechargesForm.value.paid)
            //const url = `${this.apartsUrl}/${id}`;
        let ngbDate = this.updatechargesForm.controls['month'].value;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        
        this.updatechargesForm.value.month = myDate;
        
        this.updatechargesForm.value.apartment = this.id;
        
        console.log(this.updatechargesForm.value);
        
        let URL = `${this.chargeUrl}/${this.one._id}`
        this.httpService.updateCharge(URL, this.updatechargesForm.value)
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
