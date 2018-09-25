import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        SigninRoutingModule,
        FormsModule,
        SharedModule
    ],
})

export class SigninModule { }