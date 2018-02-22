import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

//Components
import { HeaderComponent } from './components/header/header.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';

//3rd Party
import { SidebarJSModule } from 'ng-sidebarjs';

@NgModule({
  declarations: [
    HeaderComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    SidebarJSModule.forRoot(),
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SidemenuComponent,
  ]
})
export class SharedModule { }
