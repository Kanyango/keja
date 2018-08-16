import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http';
import { HttpServices } from '../services/httpservices';
import { UnitModel } from './UnitModel';

@Component({
    selector: 'unitnames-component',
    templateUrl: './unitnames.html'
})

export class UnitsNamesComponent implements OnInit
{
    id = '';
    format = '';
    start_letter = '';
    end_letter = '';
    start_no = 0;
    end_no = 0;
    
    alphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 
              'j', 'k', 'l', 'm', 'n', 
              'o', 'p', 'q' , 'r',  's', 't', 'u',
              'v', 'w', 'x' ,'y', ', z'];
              
    public assetsUrl =  'http://localhost:8100/unitexcel/';
    public unitsUrl  =  'http://localhost:8100/unit/';
        
       constructor(private fb: FormBuilder, private modalService: NgbModal, 
                    private http: HttpClient,
                    private route: ActivatedRoute,
                    private router: Router,
                     private httpService: HttpServices,
                     private location: Location,
                    private el: ElementRef
                    )
   {
     //this.creatExpense();
      //@ViewChild('fileInput') fileInputEl: ElementRef;
   }
   
   ngOnInit()
   {
    this.id = this.route.snapshot.paramMap.get('id');
   }
   
   
   upload_assets() {
              
        const URL = `${this.assetsUrl}${this.id}`;
        let inputEl: HTMLInputElement =  this.el.nativeElement.querySelector("#asset");
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        
        if (fileCount > 0) { // a file was selected
            formData.append('asset', inputEl.files.item(0));
               
               console.log(inputEl.files.item(0));
        
            this.httpService.excelFile(URL, formData)
                .subscribe(data => {
                        console.log(data);
                   },
                   error => {
                     console.error("Error saving food!", error);
                     return Observable.throw(error);
                   }
                );  
          }
           this.router.navigate(['apartments']);
       }

   
   /*saveNames(units: any)
   {
   
    let url = `${this.unitsUrl}${this.id}`;
    
    this.httpService.addUnitNames(url, units)
        .subscribe(data => {
                console.log(data);
                this.apartment = data;
                
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );  
   
   }*/
   
   

}