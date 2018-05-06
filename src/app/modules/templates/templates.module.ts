import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TemplatesRoutingModule } from '../templates/templates-routing.module';
import { TemplatesComponent } from '../templates/templates.component';

@NgModule({

  declarations: [
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule
  ]
}) 
export class TemplatesModule { }
