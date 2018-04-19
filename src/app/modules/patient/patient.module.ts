import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '../../auth/auth-guard.service';

@NgModule({
    declarations: [
        PatientComponent,
        AddPatientComponent,
        PatientDetailsComponent,
    ],
    imports: [
        PatientRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService, 
        AuthGuard
    ]
})

export class PatientModule{}