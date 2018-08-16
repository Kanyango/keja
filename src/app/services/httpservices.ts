import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' })
};


@Injectable()
export class HttpServices {
    constructor(private http: HttpClient) { }
 
    getAllAparts() {
        return this.http.get('https://kejaserver.herokuapp.com/unit');
    }
    
    createAparts(formvals) {
        return this.http.post('https://kejaserver.herokuapp.com/unit', formvals, httpOptions );
    }
    
    editApart(url: string, one: any)
    {   
        return this.http.put(url, one);
    }
    getUnit(url: string)
    {
        return this.http.get(url);
    }
    addUnits(url: string, units: any)
    {
        return this.http.put(url, units);
    }
    getUnits(url: string)
    {
        return this.http.get(url);
    }
    getExpenses(url: string)
    {
        return this.http.get(url);
    }
    createExpense(url: string, formvals: any)
    {
        return this.http.post(url, formvals);
    }
    getPayments(url: string)
    {
        return this.http.get(url);
    }
    createPayments(url: string, formvals: any)
    {
        return this.http.post(url, formvals);
    }
    getTenants(url: string)
    {
        return this.http.get(url);
    }
    createTenant(url: string, formvals: any)
    {
        return this.http.post(url, formvals);
    }
    getSingleApart(URL: string)
    {
        return this.http.get(URL);
    }
    addUnitNames(URL: string, units: any)
    {
        return this.http.put(URL, units)
    }
    excelFile(URL: string, formData: any)
    {
        return this.http.put(URL, formData)
    }
    getSingleUnit(URL: string)
    {
        return this.http.get(URL);
    }
    
    createMaintain(URL: string, formData: any)
    {
        return this.http.post(URL, formData);
    }
    
    getMaintain(URL: string)
    {
        return this.http.get(URL);
    }
    
     createRefund(URL: string, formData: any)
    {
        return this.http.post(URL, formData);
    }
    
     getRefund(URL: string)
    {
        return this.http.get(URL);
    }
    
    createCharge(URL: string, formData: any)
    {
        return this.http.post(URL, formData);
    }
    
     getCharges(URL: string)
    {
        return this.http.get(URL);
    }
    
    updateExpense(URL: string, formData: any)
        {
            return this.http.put(URL, formData);
        }
    updatePayments(URL: string, formData: any)
        {
            return this.http.put(URL, formData);
        }
    updateTenant(URL: string, formData: any)
        {
            return this.http.put(URL, formData);
        }
     updateMaintain(URL: string, formData: any)
        {
            return this.http.put(URL, formData);
        }
    updateRefund(URL: string, formData: any)
        {
            return this.http.put(URL, formData);
        }
    updateCharge(URL: string, formData: any)
        {
            return this.http.put(URL, formData);
        }
}
