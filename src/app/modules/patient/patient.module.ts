import { NgModule } from '@angular/core';
import { PatientComponent } from './patient.component';
import { PatientRoutingModule } from './patient-routing.module';

@NgModule({
    imports: [
        PatientRoutingModule
    ],
    declarations: [
        PatientComponent
    ]
})

export class PatientModule{}