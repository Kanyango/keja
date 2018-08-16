import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }   from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { LocalStorageModule } from 'angular-2-local-storage'

import { ReactiveFormsModule } from '@angular/forms';
import {
        FormsModule,
        FormGroup,
        FormControl
} from '@angular/forms'

import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AuthenticationService } from './services/authentication.services';
import { HttpServices } from './services/httpservices';
import { EqualValidator } from './services/equal-validator.directive';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { CreateApartmentComponent } from './onboarding/createapart';
import { EditApartComponent } from './aparts/editapart';

import { PaymentsComponent } from './payments/payments';
import { DashComponent } from './dash/dash';
import { NavbarComponent } from './navbar/navbar';
import { ExpensesComponent } from './expenses/expenses';
import { NewExpensesComponent } from './expenses/newexpense';
import { NewPaymentsComponent } from './payments/newpayments';
import { TenantsComponent } from './tenants/tenants';
import { NewTenantsComponent } from './tenants/newtenant';
import { ApartmentsComponent } from './aparts/apartments';
import { NewApartmentComponent } from './aparts/newapartment';
import { UnitsNamesComponent } from './units/unitnames';
//import { SingleTenantsComponent } from './tenants/billingtenant';

import { LoginComponent } from './auth/login';
import { RegisterComponent } from './auth/register';
import { HomeComponent } from './home/home';
import { ChargesComponent } from './charges/charges';
import { NewChargesComponent } from './charges/newcharge';
import { MaintenanceComponent } from './maintenance/maintain';
import { NewMaintainComponent } from './maintenance/newmaintain';
import { RefundsComponent } from './refunds/refunds';
import { NewRefundComponent } from './refunds/newrefund';
import { SubUsersComponent } from './subusers/subs';
import { UpadateExpensesComponent } from './expenses/update';
import { UpdatePaymentsComponent } from './payments/update';
import { UpdateTenantsComponent } from './tenants/update';
import { UpdateMaintainComponent } from './maintenance/update';
import { UpdateRefundComponent } from './refunds/update';
import { UpdateChargesComponent } from './charges/update';
import { PropertyHeaderComponent } from './property/property';
import { FrontendComponent } from './frontent/frontend';
import { UnitModalComponent } from './units/unitmodal';

@NgModule({
  declarations: [
    AppComponent,
    CreateApartmentComponent,
    PaymentsComponent,
    DashComponent,
    NavbarComponent,
    ExpensesComponent,
    NewExpensesComponent,
    NewPaymentsComponent,
    TenantsComponent,
    NewTenantsComponent,
    ApartmentsComponent,
    ApartmentsComponent,
    NewApartmentComponent,
    LoginComponent,
    RegisterComponent,
    EditApartComponent,
    HomeComponent,
    UnitModalComponent,
    //SingleTenantsComponent,
    UnitsNamesComponent,
    ChargesComponent,
    NewChargesComponent,
    MaintenanceComponent,
    NewMaintainComponent,
    RefundsComponent,
    NewRefundComponent,
    SubUsersComponent,
    UpadateExpensesComponent,
    UpdatePaymentsComponent,
    UpdateTenantsComponent,
    UpdateMaintainComponent,
    UpdateRefundComponent,
    UpdateChargesComponent,
    PropertyHeaderComponent,
    EqualValidator,
    FrontendComponent
    // FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    RouterModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    LocalStorageModule.withConfig({
            prefix: 'keja-manager',
            storageType: 'localStorage'
        })
  ],
  providers: 
  [
        AuthGuard,
        AuthenticationService,
        HttpServices,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
