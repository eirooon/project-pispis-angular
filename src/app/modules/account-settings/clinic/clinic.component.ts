import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clinic } from '../../../shared/models/clinicModel';

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
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.getClinics()
      .subscribe(clinics => {
        if (clinics.length > 0) {
          console.log('[Clinic] List loaded successful');
          this.hasList = true;
          this.clinics = clinics;
          console.log('[Clinic] Clinic data: ' + this.clinics);
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

  getClinics() {
    console.log("UID DOCTOR: [" + localStorage.getItem("UID") + "]");
    this.clinicsCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));
    this.clinic = this.clinicsCollection.snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Clinic;
          data.id = a.payload.doc.id;
          console.log(data);
          return data;
        })
      });
    console.log(this.clinic);
    return this.clinic;
  }

  goBack() {
    this.location.back();
  }
}
