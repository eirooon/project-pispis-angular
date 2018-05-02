import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { SettingsComponent } from './settings.component';
import { ClinicComponent } from './clinic/clinic.component';

const routes: Routes = [
  { 
    path: '', 
    component: SettingsComponent,
    canActivate:[AuthGuard]
  },
  { path: 'clinic', 
    component: ClinicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
