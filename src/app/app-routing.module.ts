import { NgModule } from '@angular/core';
import { RouterModule, Routes,  PreloadAllModules} from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'signup' },
    { path: 'patient', loadChildren: './modules/patient/patient.module#PatientModule'},
];

@NgModule({
	imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { } 