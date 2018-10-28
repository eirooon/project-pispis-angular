import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SignupModule } from './auth/signup/signup.module';
import { SigninModule } from './auth/signin/signin.module';
import { TestBackendModule } from './modules/a-testbackend/a-testbackend.module';

//Firestore
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ServiceWorkerModule } from '@angular/service-worker';

import { SuiModule } from 'ng2-semantic-ui';
import { HttpModule } from '@angular/http';
import { ConsultationService } from './shared/service/consultation.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    SignupModule,
    SigninModule,
    TestBackendModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SuiModule,
   
  ],
  bootstrap: [AppComponent],
  providers:[
    ConsultationService
  ]
})
export class AppModule {}