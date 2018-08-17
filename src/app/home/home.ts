import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpServices } from '../services/httpservices';
import { Charges } from '../charges/charge';
import { Maintain } from '../maintenance/maint';
import { Tenant } from '../tenants/tenant';
import { Apart } from '../aparts/apart';
import { Payments } from '../payments/paymodel';
import { Expense } from '../expenses/exp';
import { Refund } from '../refunds/refund';

@Component({
    selector: 'home-component',
    templateUrl: './home.html'
})

export class HomeComponent implements OnInit
{
    id = '';
    option: any = {};
    apartment: Apart;
    tenants: Tenant[];
    charges: Charges[];
    maintains: Maintain[];
    
    tot_maintain = 0;
    tot_refunds = 0;
    refunds = 0;
    
    total_rent = 0;
    rent_clts = 0;
    
    tentact = 0;
    totunits = 0;
    totalexpenses = 0;
    
    private apartsUrl   = 'https://kejaserver.herokuapp.com/unit';
    private payUrl      = 'https://kejaserver.herokuapp.com/allpayments'; 
    private tenantsUrl  = 'https://kejaserver.herokuapp.com/alltenants/'; 
    private expUrl      = 'https://kejaserver.herokuapp.com/allexpense/';
    private chargesUrl  = 'https://kejaserver.herokuapp.com/charges/'; 
    private maintainUrl = 'https://kejaserver.herokuapp.com/maintain';
    private refundUrl   = 'https://kejaserver.herokuapp.com/refund';
    
    constructor(private httpService: HttpServices,
                private router: Router,
                private route: ActivatedRoute){}
    
    ngOnInit()
    {
        let tot_rent = 0;
        
        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id);
        
        let URL = `${this.apartsUrl}/${this.id}`;
        
        this.httpService.getUnit(URL)
            .subscribe(
               (data: Apart) => {
                 console.log('unit info', data);
                 this.apartment = data;
                 this.totunits = data.unitnames.length;
                 
                 for(let i = 0; i < data.unitnames.length; i++)
                    {
                        tot_rent += parseInt(data.unitnames[i].rent);
                    
                       // this.totunits += parseInt(data.units[i].unit_no)
                    }
                    console.log('Total units', this.totunits + ' unitnames length ' +  data.unitnames.length);
                    
                    this.total_rent = tot_rent;
                    //console.log(this.total_rent);
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
            console.log('Total UNits', this.apartment.unitnames.length);
            console.log('Total UNits', this.apartment);
      
            this.getPayments();
            this.getTenants();
            this.getExpenses();
            this.getCharges();
            this.getMaintain();
            this.getRefund();
    }
    
    getPayments()
    {
        
        let URL = `${this.payUrl}/${this.id}`;
        this.httpService.getPayments(URL)
            .subscribe(
               (data: Payments[]) => {
                    console.log('Payments data',data);
                    
                    for(let i = 0; i < data.length; i++)
                    {   
                      let paymonth =  data[i].paymonth;
                       
                       const [year, month, day] = paymonth.split("-");
                       let neewdate =  new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                       let rntmonth = neewdate.getMonth(); 
                       
                       var d = new Date();
                       var n = d.getMonth();
                       
                       console.log(n + ' ' +  rntmonth)
                       
                       if( n == rntmonth)
                       {
                          this.rent_clts += parseInt(data[i].amount_paid);
                       }
                       
                       paymonth = '';
                    }
                   },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
    }
    
    getTenants()
    {
        let URL = `${this.tenantsUrl}${this.id}`;
        
        this.httpService.getTenants(URL)
            .subscribe(
               (data: Tenant[]) => {
                    console.log('Tenants',data);
                    for(let t =0; t < data.length; t++)
                        {
                            if(data[t].status = 'active')
                                {
                                    this.tenants.push(data[t]);
                                    
                                }
                        }
                  this.tentact = this.tenants.length;
                 
                  console.log('We are tenants', this.tenants);
                 
                  console.log('Iam total tenants', this.tentact + ' total tenants' +  this.tenants.length);
                  
                   },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
    }
    
    getExpenses()
    {
        let URL = `${this.expUrl}${this.id}`;
        
        let xaxis = [];
        let yaxis = [];
        let dntobj = {value: 0, name: ''};
        let dntData = [];
        
        this.httpService.getExpenses(URL)
            .subscribe(
               (data: Expense[]) => {
                        console.log('Expones',data);
                        for(let i = 0; i < data.length; i++)
                        {
                            dntobj.value = parseInt(data[i].amount);
                            dntobj.name  = data[i].title;
                            dntData.push(dntobj);
                            
                            this.totalexpenses += parseInt(data[i].amount);
                            xaxis.push(parseInt(data[i].title));
                            
                            dntobj = {value: 0, name: ''};
                            
                        }
                        
                        this.option = 
                        {
                            tooltip: {
                                        trigger: 'item',
                                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                                    },
                            legend: {
                                        orient: 'vertical',
                                        x     : 'left',
                                        data  :  xaxis
                                    },
                            series : 
                                    {
                                        name: 'Expenses Chart',
                                        type: 'pie',
                                        radius: ['50%', '70%'],
                                        avoidLabelOverlap: false,
                                        label: {
                                            normal: {
                                                show: false,
                                                position: 'center'
                                            },
                                            emphasis: {
                                                show: true,
                                                textStyle: {
                                                    fontSize: '30',
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        },
                                        labelLine: {
                                            normal: {
                                                show: false
                                            }
                                        },
                                        data: dntData
                                    }
                            }   
                        
                        console.log(this.option);
                        
                        
                   },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
    }
    
    getCharges()
    {
        const URL = `${this.chargesUrl}${this.id}`;
        this.httpService.getCharges(URL)
        .subscribe(
           (data: Charges[]) => {
             console.log(data);
             
             var result = [];
                data.reduce(function (res, value) {
                    if (!res[value.description]) {
                        res[value.description] = {
                            amount: 0,
                            description: value.description
                        };
                        result.push(res[value.description])
                    }
                    res[value.description].amount += parseInt(value.amount)
                    return res;
                }, {});
            
            console.log('Iam the result',result);
            
            this.charges = result;
            
           },
           error => {
             console.error("Error saving food!");
             return Observable.throw(error);
           }
        );   
    }
    
    getMaintain()
    {
        let url = `${this.maintainUrl}/${this.id}`;
        this.httpService.getMaintain(url)
            .subscribe(
               (data : Maintain[])=> {
                 
                 console.log('Maintain',data);
                 
                 for(let i = 0; i < data.length; i++)
                    {   
                       let maintainmonth =  data[i].start_date;
                       
                       let [year, month, day] = maintainmonth.split("-");
                       let neewdate =  new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                       let rntmonth = neewdate.getMonth(); 
                       
                       var d = new Date();
                       var n = d.getMonth();
                       
                       console.log(n + ' ' +  rntmonth)
                       
                       if( n == rntmonth)
                       {
                          this.tot_maintain += parseInt(data[i].total_cost);
                       }
                    }
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
    }
    getRefund()
    {
        let url = `${this.refundUrl}/${this.id}`;
        
        this.httpService.getRefund(url)
            .subscribe(
               (data: Refund[]) => {
                 
                 for(let i = 0; i < data.length; i++)
                    {   
                       let refundmonth =  data[i].refund_date;
                       
                       const [year, month, day] = refundmonth.split("-");
                       let neewdate =  new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
                       let rntmonth = neewdate.getMonth(); 
                       
                       var d = new Date();
                       var n = d.getMonth();
                       
                       console.log(n + ' ' +  rntmonth)
                       
                       if( n == rntmonth)
                       {
                          this.tot_refunds += parseInt(data[i].refund_amount);
                       }
                    }
                 
               },
               error => {
                 console.error("Error saving food!");
                 return Observable.throw(error);
               }
            );
    }
    
}
