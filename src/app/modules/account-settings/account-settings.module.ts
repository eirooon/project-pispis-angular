import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountSettingsRoutingModule } from '../account-settings/account-settings-routing.module';

import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { ClinicComponent } from '../account-settings/clinic/clinic.component';
import { AddClinicComponent } from '../account-settings/add-clinic/add-clinic.component';

@NgModule({

  declarations: [
    AccountSettingsComponent,
    ClinicComponent,
    AddClinicComponent
  ],
  imports: [
    AccountSettingsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
}) 
export class AccountSettingsModule { }
