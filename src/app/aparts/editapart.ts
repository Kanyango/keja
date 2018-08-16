import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.services';
import { HttpServices } from '../services/httpservices';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { UnitModel } from '../units/UnitModel';
import { Charges } from './charges';


@Component({
    selector: 'editapart-component',
    templateUrl: './editapart.html'
})

export class EditApartComponent implements OnInit
{ 
  editApartForm: FormGroup;
  
  @Input() one: any;
  @Input() id: any;
  closeResult: string;

  apartUrl = 'http://localhost:8100/unit/';
  editApart = 'http://localhost:8100/unititle/';
  
  constructor(private modalService: NgbModal, private httpService: HttpServices,
            private modalRef: NgbModalRef, private fb: FormBuilder) {}

  ngOnInit()
  {
     this.getApartment();
  }
  
  getApartment()
  {
      let id  = this.one._id;
      let URL = `${this.apartUrl}${id}`;
      
     this.httpService.getSingleApart(URL)
                .subscribe(
                   data => {
                        console.log(data);
                        this.createForm(data);
                   },
                   error => {
                     console.error("Error saving food!");
                     return Observable.throw(error);
                   }
                );
  }
  
  createForm(info)
   {
      this.editApartForm = this.fb.group({
          title: [info.title, Validators.required],
          charges: this.fb.array([])
        });
        this.setCharges(info.charges);
   }
     
       get charges(): FormArray 
        {
            return this.editApartForm.get('charges') as FormArray;
        };

      setCharges(charges: Charges[]) {
        const chargeFGs = charges.map(charge => this.fb.group(charge));
        const chargeFormArray = this.fb.array(chargeFGs);
        this.editApartForm.setControl('charges', chargeFormArray);
      }

      addUnit() 
      {
        this.charges.push(this.fb.group(new Charges()));
      }
      
    removeUnit(i: number) 
    {
        const control = <FormArray>this.editApartForm.controls['charges'];
        control.removeAt(i);
    }
    
  
  onSave()
  {
    console.log('Edits', this.editApartForm.value);
    
    let id = this.one._id;
    
    let URL = `${this.editApart}${id}`;
    
    this.httpService.editApart(URL, this.editApartForm.value)
            .subscribe(
               data => {
                 console.log(data);
               },
               error => {
                 console.error("Error saving food!", error);
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