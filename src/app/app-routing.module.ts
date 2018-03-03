import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { PatientComponent } from './modules/patient/patient.component';

const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent},
    { path: 'patient', component: PatientComponent},
    // { path: 'login', loadChildren: './modules/login/login.module#LoginModule'},
    // { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule'},
    // { path: 'patient', loadChildren: 'app/modules/patient/patient.module#PatientModule'},
    // { path: '**', component: PageNotFoundComponent }
    

];

@NgModule({
	imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { } 