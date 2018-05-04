import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicComponent } from './clinic.component';
import { SharedModule } from '../../shared/shared.module';
import { SettingsRoutingModule } from './clinic-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddClinicComponent } from './add-clinic/add-clinic.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClinicComponent,
    AddClinicComponent
  ]
})
export class ClinicModule { }
