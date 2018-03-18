import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';


@NgModule({
    declarations: [
        SigninComponent
    ],
    imports: [
        SigninRoutingModule,
        FormsModule,
    ]
})

export class SigninModule{}