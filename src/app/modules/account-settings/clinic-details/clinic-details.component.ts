import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../shared/service/clinic.service';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { Observable } from '@firebase/util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {

 
  clinicsScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicsScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = true;
  state: string = '';
  clinicsSchedules: ClinicScheduleModel[];

  constructor(
    private location: Location,
    private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    console.log('[ClinicDetailsComponent] this.ngOnInit');
    this.clinicService.getClinicsSchedule()
    .subscribe(clinics => {
      if (clinics.length > 0) {
        console.log('[ClinicDetailsComponent] List loaded successful');
        this.hasList = true;
        this.clinicsSchedules = clinics;
        console.log('[ClinicDetailsComponent] Clinic schedule data: ' + this.clinicsSchedules);
      } else {
        this.hasList = false;
      }
    },
      err => {
        console.error('[ClinicDetailsComponent] Error: ', err.message);
        this.hasList = false;
      },
  );
  }

}
