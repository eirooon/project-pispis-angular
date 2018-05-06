import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { ClinicComponent } from '../account-settings/clinic/clinic.component';
import { AddClinicComponent } from '../account-settings/add-clinic/add-clinic.component';

const routes: Routes = [
  { 
    path: '', 
    component: AccountSettingsComponent,
    canActivate:[AuthGuard]
  },
  { path: 'clinic', 
    component: ClinicComponent,
  },
  { path: 'clinic/add-patient', 
    component: AddClinicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }
