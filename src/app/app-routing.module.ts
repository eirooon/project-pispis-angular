import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AuthGuard } from './shared/service/auth-guard.service';

const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'signin'},
    { path: 'patient', loadChildren: './modules/patient/patient.module#PatientModule', canActivate:[AuthGuard]},
    { path: 'account-settings', loadChildren: './modules/account-settings/account-settings.module#AccountSettingsModule', canActivate:[AuthGuard]},
];

@NgModule({
	imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { } 