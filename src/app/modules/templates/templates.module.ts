import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { TemplatesRoutingModule } from '../templates/templates-routing.module';
import { TemplatesComponent } from '../templates/templates.component';
import { TemplateDetailsComponent } from '../templates/template-details/template-details.component';
import { TemplatePreviewComponent } from '../templates/template-preview/template-preview.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({

  declarations: [
    TemplatesComponent,
    TemplateDetailsComponent,
    TemplatePreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
}) 
export class TemplatesModule { }
