import { Component, OnInit, Input,  ViewChild, Output, EventEmitter} from '@angular/core';
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
import { Tenant } from '../tenants/tenant';
import { Payments } from './paymodel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'newpayments-component',
    templateUrl: './newpayments.html'
})

export class NewPaymentsComponent implements OnInit
{
   @ViewChild('f') form: any;
   @Output('update') change: EventEmitter<any> = new EventEmitter<any>();
   @Input() id: any;
   tenants: Tenant[];
   modalRef: NgbModalRef;
   
   paymentsForm: FormGroup;
   closeResult: string;
   units: Unit;
   payment: Payments = {};
   
   private payUrl     = 'https://kejaserver.herokuapp.com/payments';
   private unitsUrl   = 'https://kejaserver.herokuapp.com/unit/';
   private tenantsUrl = 'https://kejaserver.herokuapp.com/alltenants/';
   
   constructor(private fb: FormBuilder, 
                private ngbDateParserFormatter: NgbDateParserFormatter,
                private modalService: NgbModal, 
                private http: HttpClient,
                private route: ActivatedRoute,
                private location: Location,
                private httpService: HttpServices)
   {
     //this.creatExpense();
   }
   
   ngOnInit()
   {
    this.id = this.route.snapshot.paramMap.get('id');
     this.getUnits();
     this.getTenant();
   }
   
   getUnits()
   {
     let id = this.id;
    
     let url = `${this.unitsUrl}${id}`;
        this.httpService.getUnits(url)
        .subscribe(
           (data : Unit) => {
             console.log('All units',data);
             this.units = data;
           },
           error => {
             console.error("Error saving food!", error);
             return Observable.throw(error);
           }
        );   
   }

   
   getTenant()
   {
        const URL = `${this.tenantsUrl}${this.id}`;
        this.httpService.getTenants(URL)
        .subscribe(
           (data: Tenant[]) => {
             console.log('Tenants',data);
             this.tenants = data;
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );   
   }
   
   onSubmit()
   {
   let rent = 0;
   
    for(let i = 0; i < this.units.unitnames.length; i++)
        {
            if(this.payment.house_no == this.units.unitnames[i].unit)
                {
                    rent = parseInt(this.units.unitnames[i].rent);
                }
        }
    
    for(let n = 0; n < this.tenants.length; n++)
        {       
             if((this.payment.house_no == this.tenants[n].house_no) && (this.tenants[n].status == 'active'))
                {
                    this.payment.tenant = this.tenants[n]._id;
                }   
        }
        
    console.log(this.payment);
       this.payment.apartment = this.id;
       this.payment.balance = rent - parseInt(this.payment.amount_paid);
        
        
        let ngbDate: any = this.payment.paymonth;
        let myDate = this.ngbDateParserFormatter.format(ngbDate);
        this.payment.paymonth = myDate;
        
        //this.http.post(this.payUrl, this.payment, httpOptions)
        this.httpService.createPayments(this.payUrl, this.payment)
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
   
   
   
   open(content) 
   {
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
