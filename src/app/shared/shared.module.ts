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

@NgModule({
  imports: [
    CommonModule,
    SidebarJSModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    SidemenuComponent
  ],
  exports: [
    HeaderComponent,
    SidemenuComponent,
    CommonModule
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
