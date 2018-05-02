import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './shared/service/auth-guard.service';

const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'signin'},
    { path: 'patient', loadChildren: './modules/patient/patient.module#PatientModule', canActivate:[AuthGuard]},
    { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule', canActivate:[AuthGuard]},
];

@NgModule({
	imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { } 