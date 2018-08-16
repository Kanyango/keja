import { Component, OnInit , Input} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { Unit, UnDefs } from '../models/unit';
import { Tenant } from '../tenants/tenant';
import { Payments } from '../payments/paymodel';

@Component({
    selector: 'unitmodal-component',
    templateUrl: './unitmodal.html'
})

export class UnitModalComponent implements OnInit
{
    closeResult: string;
    @Input() unit: any;
    @Input() id;
    tenants: Tenant[];
    pays: Payments[];
    mypays: Payments[];
    tenant: Tenant;
    
    tenantsUrl = 'https://kejaserver.herokuapp.com/alltenants/';
    private payUrl = 'https://kejaserver.herokuapp.com/allpayments'; 
    
    constructor(private modalService: NgbModal, private httpService: HttpServices, private route: ActivatedRoute,) {}

    ngOnInit()
    {
        //this.getPayments();
       // this.id = this.route.snapshot.paramMap.get('id');
       console.log('Iam a unit', this.unit);
        console.log('Iam id', this.id);
        this.getCurrentTenant(this.id);
    }
    getCurrentTenant(id)
    {
        
        let URL = `${this.tenantsUrl}${id}`;
        
        this.httpService.getTenants(URL)
            .subscribe(
               (data: Tenant[])=> {
                     
                     this.tenants = data;
                     for(let i = 0; i < this.tenants.length; i++)
                        {
                            if(this.tenants[i].house_no == this.unit.unit_no && this.tenants[i].status == 'active')
                            {
                                this.tenant = this.tenants[i];
                                this.getPayments(this.tenant)
                            }
                        }
                   },
                   error => {
                     console.error("Error saving food!");
                     return Observable.throw(error);
                   }
                ); 
    }
    
    getPayments(tenant: any)
    {
       let URL = `${this.payUrl}/${this.id}`;
        
        console.log(tenant);
        
        this.httpService.getPayments(URL)
            .subscribe(
               (data: Payments[]) => {
                     //console.log(data);
                     this.pays = data;
                     for(let i = 0; i < this.pays.length; i++)
                        {
                            if(this.pays[i].house_no == this.unit.unit_no && tenant.move_in < this.pays[i].paymonth)
                            {
                                this.mypays.push(this.pays[i]);
                                
                                console.log('Payments', this.mypays);
                            }
                        }
                   },
                   error => {
                     console.error("Error saving food!", error);
                     return Observable.throw(error);
                   }
                );  
    }
    
    
    
    open(content) {
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
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
