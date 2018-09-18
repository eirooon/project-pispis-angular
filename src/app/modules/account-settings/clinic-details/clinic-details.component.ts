import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClinicService } from '../../../shared/service/clinic.service';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})

export class ClinicDetailsComponent implements OnInit {

 
  clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = false;
  state: string = '';
  clinicScheduleList: ClinicScheduleModel[];
  clinicScheduleItem : ClinicScheduleModel;

  myTitle = "Clinic"
  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    this.clinicService.getClinicsSchedule()
      .subscribe(item => {
        if (item.length > 0) {
          console.log('[ClinicSchedule] List loaded successful');
          this.hasList = true;
          this.clinicScheduleList = item;
          console.log('[ClinicSchedule] ClinicSchedule data: ', this.clinicScheduleList);
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


  goBack() {
    this.location.back();
  }

}
