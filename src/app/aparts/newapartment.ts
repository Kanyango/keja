import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { UnitModel } from '../units/UnitModel';
import { Charges } from './charges';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'newapartment-component',
    templateUrl: './newapartment.html'
})

export class NewApartmentComponent
{
   @Output('updateList') change: EventEmitter<any> = new EventEmitter<any>();
   apartmentForm: FormGroup;
   apartments = [];
   apartment = {title: '', _id: ''};
   closeResult: string;
   
   private apartsUrl = 'https://kejaserver.herokuapp.com/unit';  // URL to web api
   
   constructor(private fb: FormBuilder, private modalService: NgbModal, private http: HttpClient,
                private modalRef: NgbModalRef,
                private httpService: HttpServices)
   {
     this.creatApartment();
   }
   
   
   creatApartment()
   {
      this.apartmentForm = this.fb.group({
          title   : ['', Validators.required],
          charges : this.fb.array([])
        });
   }
   
   get charges(): FormArray 
    {
        return this.apartmentForm.get('charges') as FormArray;
    };

      setCharges(charges: Charges[]) {
        const chargeFGs = charges.map(charge => this.fb.group(charge));
        const chargeFormArray = this.fb.array(chargeFGs);
        this.apartmentForm.setControl('charges', chargeFormArray);
      }

      addUnit() 
      {
        this.charges.push(this.fb.group(new Charges()));
      }
      
    removeUnit(i: number) 
    {
        const control = <FormArray>this.apartmentForm.controls['charges'];
        control.removeAt(i);
    }
    
   onSubmit()
   {
        //const url = `${this.apartsUrl}/${id}`;
        
        console.log(this.apartmentForm.value);
        
    //this.http.post(this.apartsUrl, this.apartmentForm.value, httpOptions)
    
    this.httpService.createAparts(this.apartmentForm.value)
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
   
   private handleError(error: any): Promise<any> 
   {
     console.error('An error occurred', error); // for demo purposes only
     return Promise.reject(error.message || error);
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
