import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../shared/service/clinic.service';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-view-clinic-schedules',
  templateUrl: './view-clinic-schedules.component.html',
  styleUrls: ['./view-clinic-schedules.component.css']
})
export class ViewClinicSchedulesComponent implements OnInit {


  clinicsScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicsScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = true;
  state: string = '';
  clinicsSchedule: ClinicScheduleModel[];

  constructor(
    private location: Location,
    private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    this.clinicService.getClinicsSchedule("")
    .subscribe(clinics => {
      if (clinics.length > 0) {
        console.log('[ClinicSchedule] List loaded successful');
        this.hasList = true;
        this.clinicsSchedule = clinics;
        console.log('[ClinicSchedule] Clinic data: ' + this.clinicsSchedule);
      } else {
        this.hasList = false;
      }
    },
      err => {
        console.error('[ClinicSchedule] Error: ', err.message);
        this.hasList = false;
      },
  );
  }

}
