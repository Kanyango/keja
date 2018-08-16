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
import { Unit, UnDefs } from '../models/unit';
import { Tenant } from '../tenants/tenant';
//import { Payments } from './paymodel';
import {Refund} from './refund';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'updaterefunds-component',
    templateUrl: './update.html'
})

export class UpdateRefundComponent implements OnInit
{
   @Input() id: any;
   @Input() one: any;
   
   @Output('editRefund') change: EventEmitter<any> = new EventEmitter<any>();
    
   updateRefundForm: FormGroup;
   closeResult: string;
   tenants: Tenant[];
   units: Unit;
   modalRef: NgbModalRef;
  
   private refundUrl  = 'https://kejaserver.herokuapp.com/refund';
   private tenantsUrl = 'https://kejaserver.herokuapp.com/alltenants/'; 
   private unitsUrl   = 'https://kejaserver.herokuapp.com/unit/';
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, 
               private http: HttpClient,
               private route: ActivatedRoute,
               private httpService: HttpServices,
                    private ngbDateParserFormatter: NgbDateParserFormatter)
   {}
   
   ngOnInit()
   {
     this.getUnits();
     this.getTenants();
     this.creatRefund();
   }
   
    getTenants()
    {
        const URL = `${this.tenantsUrl}${this.id}`;
        
        this.httpService.getTenants(URL)
        .subscribe(
           (data: Tenant[]) => {
             console.log(data);
             this.tenants = data;
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );   
    }
    
    getUnits()
       {
        let id = this.id;

         let url = `${this.unitsUrl}${id}`;
            this.httpService.getUnits(url)
            .subscribe(
              ( data: Unit)=> {
                 console.log('All units',data);
                 this.units = data;
               },
               error => {
                 console.error("Error saving food!", error);
                 return Observable.throw(error);
               }
            );   
       }
   
   creatRefund()
   {
      this.updateRefundForm = this.fb.group({
          house_no      : [this.one.house_no, Validators.required],
          refund_amount : [this.one.refund_amount, Validators.required],
          refund_date  :  [this.one.refund_date, Validators.required],
          refund_method : [this.one.refund_method, Validators.required]
        });
   }
   
   onSubmit()
   {
        
        
        for(let i = 0; i < this.tenants.length; i++)
            {
                if(this.tenants[i].house_no == this.updateRefundForm.value.house_no)
                    {
                        this.updateRefundForm.value.tenant_name = this.tenants[i].tenant_name;
                        this.updateRefundForm.value.tenant_phone = this.tenants[i].tenant_phone;
                    }
            }
            
            //const url = `${this.apartsUrl}/${id}`;
        let ngbDate = this.updateRefundForm.controls['refund_date'].value;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        
        this.updateRefundForm.value.refund_date = myDate;
        
        this.updateRefundForm.value.apartment = this.id;
        
        console.log(this.updateRefundForm.value);
        
        let URL = `${this.refundUrl}/${this.one._id}`;
        
        this.httpService.updateRefund(URL, this.updateRefundForm.value)
            .subscribe(
               (data : Refund)=> {
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
