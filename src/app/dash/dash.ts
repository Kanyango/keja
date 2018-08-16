import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'dash-component',
    templateUrl: './dash.html'
})

export class DashComponent
{
    id = '';
    constructor(private route: ActivatedRoute){}
    
    ngOnInit()
     {
        this.id = this.route.snapshot.paramMap.get('id');
        console.log('iam',this.id);
        
     }

}