import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TemplatesRoutingModule } from '../templates/templates-routing.module';
import { TemplatesComponent } from '../templates/templates.component';
import { TemplateDetailsComponent } from '../templates/template-details/template-details.component';

@NgModule({

  declarations: [
    TemplatesComponent,
    TemplateDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule
  ]
}) 
export class TemplatesModule { }
