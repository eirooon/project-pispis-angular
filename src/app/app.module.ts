import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module'
import { PatientModule } from './modules/patient/patient.module';

//Features
import { HomeComponent } from './modules/home/home.component';
import { PatientComponent } from './modules/patient/patient.component';
import { LoginComponent } from './modules/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
