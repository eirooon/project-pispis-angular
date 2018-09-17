import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../shared/service/auth-guard.service';

import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PdConsultationSelectionComponent } from './patient-details/pd-consultation-selection/pd-consultation-selection.component';
import { PdConsultationTextComponent } from './patient-details/pd-consultation-text/pd-consultation-text.component';
import { PdConsultationPrescriptionComponent } from './patient-details/pd-consultation-prescription/pd-consultation-prescription.component';
import { PdHealthProfileComponent } from './patient-details/pd-health-profile/pd-health-profile.component';
import { PdHealthProfileSelectionComponent } from './patient-details/pd-health-profile-selection/pd-health-profile-selection.component';
import { PdHealthProfileAllergyComponent } from './patient-details/pd-health-profile-allergy/pd-health-profile-allergy.component';


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
    component: PdConsultationSelectionComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'consultation-text', 
    component: PdConsultationTextComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'consultation-prescription', 
    component: PdConsultationPrescriptionComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'health-profile', 
    component: PdHealthProfileComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'health-profile-selection', 
    component: PdHealthProfileSelectionComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'health-profile-allergy', 
    component: PdHealthProfileAllergyComponent,
    canActivate:[AuthGuard]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
