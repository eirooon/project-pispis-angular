import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Components
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';

//Services
import { PatientService } from '../shared/service/patient.service';

//3rd Party
import { SidebarJSModule, SidebarJSService } from 'ng-sidebarjs';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { NgProgressModule } from 'ngx-progressbar';


@NgModule({
  imports: [
    CommonModule,
    SidebarJSModule,
    RouterModule,
    NgProgressModule
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
    NgProgressModule
  ],
  providers:[
    PatientService
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
