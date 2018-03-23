import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Modules
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module'
import { LoginModule } from './modules/login/login.module';
import { FormsModule }   from '@angular/forms';

//Firestore
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//Auth
import { AuthService } from './auth/auth.service';
import { SignupModule } from './auth/signup/signup.module';
import { SigninModule } from './auth/signin/signin.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthGuard } from './auth/auth-guard.service';

import { PatientService} from './shared/service/patient.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    SignupModule,
    SigninModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  
  providers: [AuthService, AuthGuard,PatientService],
  bootstrap: [AppComponent]
})
export class AppModule {}