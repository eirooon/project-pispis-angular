import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from '../models/doctor';

@Injectable()
export class DoctorService {

  doctorsCollection: AngularFirestoreCollection<Doctor>;
  doctors: Observable<Doctor[]>;
  doctor: Doctor;

  constructor(
    public afs: AngularFirestore
  ) { }

  getDoctorsName(){
		this.doctorsCollection = this.afs.collection('doctors', ref => ref.where('uid','==', localStorage.getItem("UID")));
		this.doctors = this.doctorsCollection.snapshotChanges()
			.map(changes => {
				return changes.map(a => {
					const data = a.payload.doc.data() as Doctor;
					data.id = a.payload.doc.id;
					return data;
				})
      });
		return this.doctors;
	}
}
