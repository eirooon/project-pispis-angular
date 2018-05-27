import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './patient.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PdConsultationSelectionComponent } from './patient-details/pd-consultation-selection/pd-consultation-selection.component';
import { PdConsultationComponent } from './patient-details/pd-consultation/pd-consultation.component';
import { PdConsultationTextComponent } from './patient-details/pd-consultation-text/pd-consultation-text.component';
import { PdPersonalProfileComponent } from './patient-details/pd-personal-profile/pd-personal-profile.component';

@NgModule({
    declarations: [
        PatientComponent,
        AddPatientComponent,
        PatientDetailsComponent,
        PdConsultationSelectionComponent,
        PdConsultationComponent,
        PdConsultationTextComponent,
        PdPersonalProfileComponent
    ],
    imports: [
        PatientRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class PatientModule{}