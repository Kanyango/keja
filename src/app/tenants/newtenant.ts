import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import {NgbDateParserFormatter, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Unit, UnDefs } from '../models/unit';
import { Tenant } from './tenant';
import { Payments } from '../payments/paymodel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'newtenant-component',
    templateUrl: './newtenant.html'
})

export class NewTenantsComponent implements OnInit
{
   @Input() id: any;
   @Output('update') change: EventEmitter<any> = new EventEmitter<any>();
   modalRef: NgbModalRef;
   tenantForm: FormGroup;
   closeResult: string;
   units: Unit;
   
   private tenantsUrl = 'https://kejaserver.herokuapp.com/tenants/';
   private unitsUrl   = 'https://kejaserver.herokuapp.com/unit/';
   
   constructor(private fb: FormBuilder, 
               private route: ActivatedRoute,
               private ngbDateParserFormatter: NgbDateParserFormatter,
               private modalService: NgbModal, 
               private http: HttpClient, 
               private httpService: HttpServices)
   {
     this.creatTenant();
   }
   
   ngOnInit()
   {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getUnits();
   }
   
   getUnits()
   {
    let id = this.id;
    
     let url = `${this.unitsUrl}${id}`;
        this.httpService.getUnits(url)
        .subscribe(
           (data: Unit) => {
             console.log('All units',data);
             this.units = data;
           },
           error => {
             console.error("Error saving food!", error);
             return Observable.throw(error);
           }
        );   
   }
   
   creatTenant()
   {
      this.tenantForm = this.fb.group({
          tenant_name : ['', Validators.required],
          tenant_phone: ['', Validators.required],
          house_no    : ['', Validators.required],
          move_in     : ['', Validators.required]
        });
   }
   
   onSubmit()
   {
        console.log(this.tenantForm.value);
        
        this.tenantForm.value.apartment = this.id;
        
        let ngbDate = this.tenantForm.controls['move_in'].value;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        this.tenantForm.value.move_in = myDate;
        
        this.httpService.createTenant(this.tenantsUrl, this.tenantForm.value)
        .subscribe(
           (data: Tenant) => {
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
