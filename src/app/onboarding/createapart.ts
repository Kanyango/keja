import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'createapart-component',
    templateUrl: './createapart.html'
})

export class CreateApartmentComponent
{   
   
    newApartForm: FormGroup;
    
    constructor(private fb: FormBuilder)
    {
        this.createApartForm();
    }
    
    createApartForm()
    {
        this.newApartForm = this.fb.group
        ({
          title: ['', Validators.required],
          units: ['', Validators.required]
        });
    }
    

}