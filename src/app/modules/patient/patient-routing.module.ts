import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AuthGuard } from '../../auth/auth-guard.service';
const routes: Routes = [
  { 
    path: '', 
    component: PatientComponent,
    canActivate:[AuthGuard]
    // children: [
    //   { path: 'add-patient', 
    //     component: AddPatientComponent 
    //   }
    // ]
  },
  { path: 'add-patient', 
    component: AddPatientComponent 
  },
  { 
    path: 'patient-details', 
    component: PatientDetailsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
