import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
// import {CommonModule} from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '../../auth/auth-guard.service';

@NgModule({
    declarations: [
        PatientComponent,
        AddPatientComponent,
        PatientDetailsComponent
    ],
    imports: [
        PatientRoutingModule,
        SharedModule,
        // CommonModule
    ],
    providers: [
        AuthService, 
        AuthGuard
    ]
})

export class PatientModule{}