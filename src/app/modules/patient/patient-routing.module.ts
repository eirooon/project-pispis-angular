import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PdConsultationSelectionComponent } from './patient-details/pd-consultation-selection/pd-consultation-selection.component';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { PdConsultationTextComponent } from './patient-details/pd-consultation-text/pd-consultation-text.component';

const routes: Routes = [
  { 
    path: '', 
    component: PatientComponent,
    canActivate:[AuthGuard]
  },
  { path: 'add-patient', 
    component: AddPatientComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'patient-details', 
    component: PatientDetailsComponent,
    canActivate:[AuthGuard],
  },
  { 
    path: 'consultation-selection', 
    component: PdConsultationSelectionComponent
  },
  { 
    path: 'consultation-text', 
    component: PdConsultationTextComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
