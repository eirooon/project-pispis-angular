import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { HomeComponent } from './modules/home/home.component';
const routes : Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: '', component: HomeComponent},
    { path: 'patient', loadChildren: './modules/patient/patient.module#PatientModule'},
];

@NgModule({
	imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { } 