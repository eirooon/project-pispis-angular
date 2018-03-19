import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';


@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        SigninRoutingModule,
        FormsModule,
    ],
    //providers:[AuthService]
})

export class SigninModule{}