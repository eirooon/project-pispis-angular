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
import { PdConsultationPrescriptionComponent } from './patient-details/pd-consultation-prescription/pd-consultation-prescription.component';
import { PdHealthProfileComponent } from './patient-details/pd-health-profile/pd-health-profile.component';
import { PdHealthProfileSelectionComponent } from './patient-details/pd-health-profile-selection/pd-health-profile-selection.component';
import { PdHealthProfileAllergyComponent } from './patient-details/pd-health-profile-allergy/pd-health-profile-allergy.component';
import { PdVitalSignsComponent } from './patient-details/pd-vital-signs/pd-vital-signs.component';
import { PdVitalSignsWeightComponent } from './patient-details/pd-vital-signs-weight/pd-vital-signs-weight.component';
import { PdVitalSignsAllComponent } from './patient-details/pd-vital-signs-all/pd-vital-signs-all.component';
import { PdHealthProfileMenstrualHistoryComponent } from './patient-details/pd-health-profile-menstrual-history/pd-health-profile-menstrual-history.component';
import { PdVitalsSignsHeightComponent } from './patient-details/pd-vitals-signs-height/pd-vitals-signs-height.component';
import { PdVitalsSignsBloodPressureComponent } from './patient-details/pd-vitals-signs-blood-pressure/pd-vitals-signs-blood-pressure.component';

@NgModule({
    declarations: [
        PatientComponent,
        AddPatientComponent,
        PatientDetailsComponent,
        PdConsultationSelectionComponent,
        PdConsultationComponent,
        PdConsultationTextComponent,
        PdPersonalProfileComponent,
        PdConsultationPrescriptionComponent,
        PdHealthProfileComponent,
        PdHealthProfileSelectionComponent,
        PdHealthProfileAllergyComponent,
        PdVitalSignsComponent,
        PdVitalSignsWeightComponent,
        PdVitalSignsAllComponent,
        PdHealthProfileMenstrualHistoryComponent,
        PdVitalsSignsHeightComponent,
        PdVitalsSignsBloodPressureComponent
    ],
    imports: [
        PatientRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class PatientModule{}