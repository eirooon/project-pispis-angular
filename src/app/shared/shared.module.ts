import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

//Components
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';

//Services
import { PatientService } from '../shared/service/patient.service';
import { AuthGuard } from '../shared/service/auth-guard.service';
import { AuthService } from '../shared/service/auth.service';
import { ConsultationService } from './service/consultation.service';
import { DoctorService } from '../shared/service/doctor.service';
import { ClinicService } from './service/clinic.service';
import { Logger } from './service/logger.service';
import { VitalSignsService } from './service/vital-signs.service';

//3rd Party
import { SidebarJSModule, SidebarJSService } from 'ng-sidebarjs';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { NgProgressModule } from 'ngx-progressbar';

//Semantic UI
import {
  SuiTabsModule,
  SuiSelectModule,
  SuiModalModule,
  SuiAccordionModule
} from 'ng2-semantic-ui';


@NgModule({
  imports: [
    CommonModule,
    SidebarJSModule,
    RouterModule,
    NgProgressModule,
    SuiTabsModule,
    SuiSelectModule,
    SuiModalModule,
    SuiAccordionModule,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent,
    SidemenuComponent,
    ControlMessagesComponent
  ],
  exports: [
    HeaderComponent,
    SidemenuComponent,
    CommonModule,
    ControlMessagesComponent,
    NgProgressModule,
    SuiTabsModule,
    SuiSelectModule,
    SuiModalModule,
    SuiAccordionModule,
    HttpClientModule
  ],
  providers: [
    PatientService,
    AuthGuard,
    AuthService,
    ConsultationService,
    DoctorService,
    ClinicService,
    Logger,
    VitalSignsService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SidebarJSService]
    }
  }
}
