import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { ClinicComponent } from '../account-settings/clinic/clinic.component';
import { AddClinicComponent } from '../account-settings/add-clinic/add-clinic.component';
import { AddClinicSchedulesComponent } from '../account-settings/add-clinic-schedules/add-clinic-schedules.component';
import { DoctorsProfileComponent } from './doctors-profile/doctors-profile.component';
import { ClinicDetailsComponent } from './clinic-details/clinic-details.component';

const routes: Routes = [
  { 
    path: '', 
    component: AccountSettingsComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'clinic', 
    component: ClinicComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'clinic/add-clinic', 
    component: AddClinicComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'clinic/add-schedule', 
    component: AddClinicSchedulesComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'doctors-profile', 
    component: DoctorsProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'clinic/clinic-details',
    component: ClinicDetailsComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
