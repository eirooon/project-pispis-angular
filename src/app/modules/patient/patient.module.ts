import { NgModule } from '@angular/core';
import { PatientComponent } from './patient.component';
import { PatientRoutingModule } from './patient-routing.module';
// import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        PatientComponent
    ],
    imports: [
        PatientRoutingModule,
        // SharedModule
    ]
})

export class PatientModule{}