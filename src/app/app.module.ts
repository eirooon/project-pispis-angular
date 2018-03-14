import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module'
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    SharedModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
