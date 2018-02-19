import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

// Modules
import { SidebarJSModule } from 'ng-sidebarjs';
import { ContentHomeComponent } from './content-home/content-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    ContentHomeComponent
  ],
  imports: [
    BrowserModule,
    SidebarJSModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
