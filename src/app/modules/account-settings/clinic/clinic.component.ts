import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clinic } from '../../../shared/models/clinicModel';
import { ClinicService } from '../../../shared/service/clinic.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  clinicsCollection: AngularFirestoreCollection<Clinic>;
  clinic: Observable<Clinic[]>;
  clinicsDoc: AngularFirestoreDocument<Clinic>;
  hasList: boolean = true;
  state: string = '';
  clinics: Clinic[];

  myTitle = "Clinic"
  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
  ) { }

  ngOnInit() {
    this.clinicService.getClinics()
      .subscribe(clinics => {
        if (clinics.length > 0) {
          console.log('[Clinic-View] List loaded successful');
          this.hasList = true;
          this.clinics = clinics;
          console.log('[Clinic-View] Clinic data: ' , this.clinics);
        } else {
          this.hasList = false;
        }
      },
        err => {
          console.error('[Clinic] Error: ', err.message);
          this.hasList = false;
        },
    );
  }

  goBack() {
    this.location.back();
  }

  setSelectedClinic(idClinic: Clinic){
    console.log("[Clinic]" ,  idClinic);
    this.clinicService.setClinicID(idClinic.id);
  }
}
