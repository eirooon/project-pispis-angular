import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { SignupComponent } from './auth/signup/signup.component';
//import { SigninComponent } from './auth/signin/signin.component';

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
import {AuthService} from './auth/auth.service';
import { SignupModule } from './auth/signup/signup.module';
import { SigninModule } from './auth/signin/signin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    FormsModule,
    SignupModule,
    SigninModule
  ],
  
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}