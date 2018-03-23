import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        PatientComponent,
        AddPatientComponent,
        PatientDetailsComponent
    ],
    imports: [
        PatientRoutingModule,
        SharedModule,
        CommonModule
    ]
})

export class PatientModule{}