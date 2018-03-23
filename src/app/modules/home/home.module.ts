import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../../auth/auth-guard.service';
import { AuthService } from '../../auth/auth.service';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        HomeRoutingModule,
        SharedModule 
    ],
    providers: [
        AuthService, 
        AuthGuard
    ]
})

export class HomeModule{}