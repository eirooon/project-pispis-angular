import { NgModule } from '@angular/core';

import { SignupRoutingModule } from './signup-routing.module';

import { SignupComponent } from './signup.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        SignupRoutingModule,
        FormsModule,
    ]
})

export class SignupModule{}