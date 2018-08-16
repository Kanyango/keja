import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateApartmentComponent } from './onboarding/createapart';
import { PaymentsComponent } from './payments/payments';
import { DashComponent } from './dash/dash';
import { ExpensesComponent } from './expenses/expenses';
import { TenantsComponent } from './tenants/tenants';
import { ApartmentsComponent } from './aparts/apartments';
import { LoginComponent } from './auth/login';
import { RegisterComponent } from './auth/register';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home';
import { UnitsNamesComponent } from './units/unitnames';
import { ChargesComponent } from './charges/charges';
import { NewChargesComponent } from './charges/newcharge';
import { UnitModalComponent } from './units/unitmodal';
import { MaintenanceComponent } from './maintenance/maintain';
import { RefundsComponent } from './refunds/refunds';
import { NewRefundComponent } from './refunds/newrefund';
import { SubUsersComponent } from './subusers/subs';
import { FrontendComponent } from './frontent/frontend';


const routes: Routes = 
        [
            { path: '', redirectTo: 'frontend', pathMatch: 'full' },
            { path: 'frontend', component: FrontendComponent },
            { path: 'createapart', component: CreateApartmentComponent, canActivate: [AuthGuard] },
            { path: 'apartments', component: ApartmentsComponent, canActivate: [AuthGuard] },
            //{ path: 'units/:id', component: UnitsComponent, canActivate: [AuthGuard]},
            //{ path: 'unit/:id', component: UnitComponent, canActivate: [AuthGuard] },
            { path: 'dash/:id', component: DashComponent, canActivate: [AuthGuard] ,
              children: 
                      [
                         { path: '', redirectTo: 'home/:id', pathMatch: 'full' },
                         { path: 'expenses/:id', component: ExpensesComponent },
                         { path: 'home/:id', component: HomeComponent },
                         { path: 'tenants/:id', component: TenantsComponent },
                         //{ path: 'allunits/:id', component: AllUnitsComponent },
                         { path: 'payments/:id', component: PaymentsComponent },
                         { path: 'unitnames/:id', component: UnitsNamesComponent },
                         { path: 'charges/:id', component: ChargesComponent },
                         { path: 'newcharges/:id', component: NewChargesComponent },
                         { path: 'singleunit/:id', component: UnitModalComponent },
                         { path: 'maintenance/:id', component: MaintenanceComponent },
                         { path: 'refunds/:id', component: RefundsComponent },
                         { path: 'newrefund/:id', component: NewRefundComponent },
                         { path: 'users/:id', component: SubUsersComponent }
                      ]
            },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}