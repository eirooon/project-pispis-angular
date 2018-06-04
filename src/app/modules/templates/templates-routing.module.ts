import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/service/auth-guard.service';
import { TemplatesComponent } from '../templates/templates.component';
import { TemplateDetailsComponent } from '../templates/template-details/template-details.component';
import { TemplatePreviewComponent } from '../templates/template-preview/template-preview.component';

const routes: Routes = [
  { 
    path: '', 
    component: TemplatesComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'template-details', 
    component: TemplateDetailsComponent,
    canActivate:[AuthGuard]
  },
  { 
    path: 'template-preview', 
    component: TemplatePreviewComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
