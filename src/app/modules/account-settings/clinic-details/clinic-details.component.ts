import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../shared/service/clinic.service';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { Observable } from '@firebase/util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {

 
  clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = true;
  state: string = '';
  clinicSchedules: ClinicScheduleModel[];

  myTitle = "Clinic"
  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    console.log('[ClinicDetailsComponent] this.ngOnInit');
    this.clinicService.getClinicsSchedule()
      .subscribe(clinicSchedules => {
        if (clinicSchedules.length > 0) {
          console.log('[ClinicDetailsComponent] List loaded successful');
          this.hasList = true;
          this.clinicSchedules = clinicSchedules;
          console.log('[ClinicDetailsComponent] Clinic data: ',  this.clinicSchedules);
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

  goBack() {
    this.location.back();
  }

}
