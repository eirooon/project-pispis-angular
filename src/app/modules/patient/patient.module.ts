import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
<<<<<<< HEAD
import {CommonModule} from '@angular/common';
=======
import { AuthService } from '../../auth/auth.service';
import { AuthGuard } from '../../auth/auth-guard.service';
>>>>>>> 2c0bbc5eb3df44aefa1ea172e494acf2df481017

@NgModule({
    declarations: [
        PatientComponent,
        AddPatientComponent,
        PatientDetailsComponent
    ],
    imports: [
        PatientRoutingModule,
<<<<<<< HEAD
        SharedModule,
        CommonModule
=======
        SharedModule
    ],
    providers: [
        AuthService, 
        AuthGuard
>>>>>>> 2c0bbc5eb3df44aefa1ea172e494acf2df481017
    ]
})

export class PatientModule{}