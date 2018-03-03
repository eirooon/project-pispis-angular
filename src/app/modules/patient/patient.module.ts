import { NgModule } from '@angular/core';
import { PatientComponent } from './patient.component';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        PatientRoutingModule,
        SharedModule
    ],
    declarations: [
        PatientComponent
    ]
})

export class PatientModule{}