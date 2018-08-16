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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'newmaintain-component',
    templateUrl: './newmaintain.html'
})

export class NewMaintainComponent 
{
   @Input() id: any;
   @Output('update') change: EventEmitter<any> = new EventEmitter<any>();
   modalRef: NgbModalRef;
   maintainForm: FormGroup;
   closeResult: string;
   private maintainUrl = 'https://kejaserver.herokuapp.com/maintain';
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, 
                    private http: HttpClient,
                    private route: ActivatedRoute,
                     private httpService: HttpServices,
                    private ngbDateParserFormatter: NgbDateParserFormatter)
   {
     this.creatMaintain();
   }
   
   
   creatMaintain()
   {
      this.maintainForm = this.fb.group({
          description: ['', Validators.required],
          total_cost : ['', Validators.required],
          start_date : ['', Validators.required],
          end_date   : ['', Validators.required]
        });
   }
   
   onSubmit()
   {
            //const url = `${this.apartsUrl}/${id}`;
        let start_Date = this.maintainForm.controls['start_date'].value;
        let end_Date = this.maintainForm.controls['end_date'].value;
        
        let new_start = this.ngbDateParserFormatter.format(start_Date);
        let new_end = this.ngbDateParserFormatter.format(end_Date);
        
        this.maintainForm.value.start_date = new_start;
        this.maintainForm.value.end_date = new_end;
        
        this.maintainForm.value.apartment = this.id;
        
        console.log(this.maintainForm.value);
        
        let URL = `${this.maintainUrl}/${this.id}`
        this.httpService.createMaintain(this.maintainUrl, this.maintainForm.value)
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
