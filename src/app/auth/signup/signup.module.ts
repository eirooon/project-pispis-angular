import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule }   from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    declarations: [
        SignupComponent,
    ],
    imports: [
        SignupRoutingModule,
        FormsModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        SharedModule
    ]
})

export class SignupModule{}