import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { ClinicComponent } from '../account-settings/clinic/clinic.component';
import { AddClinicComponent } from '../account-settings/add-clinic/add-clinic.component';
import { AddClinicSchedulesComponent } from '../account-settings/add-clinic-schedules/add-clinic-schedules.component';

const routes: Routes = [
  { 
    path: '', 
    component: AccountSettingsComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'clinic', 
    component: ClinicComponent,
  },
  { 
    path: 'clinic/add-clinic', 
    component: AddClinicComponent,
  },
  { 
    path: 'clinic/add-schedule', 
    component: AddClinicSchedulesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
