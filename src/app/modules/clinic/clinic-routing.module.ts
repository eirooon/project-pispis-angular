import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { ClinicComponent } from './clinic.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';

const routes: Routes = [
  { 
    path: '', 
    component: ClinicComponent,
    canActivate:[AuthGuard]
  },
  { path: 'clinic', 
    component: AddClinicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
