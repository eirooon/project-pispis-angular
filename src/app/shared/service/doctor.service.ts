import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from '../models/doctor';

@Injectable()
export class DoctorService {

  doctorsCollection: AngularFirestoreCollection<Doctor>;
  doctorsDocument: AngularFirestoreDocument<Doctor>;
  doctors: Observable<Doctor[]>;
  doctor: Doctor;

  constructor(
    public afs: AngularFirestore
  ) { 
	this.doctorsCollection = this.afs.collection('doctors');
  }

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

	getDoctor(){
		this.doctors = this.afs.collection('doctors', ref => ref.where('uid','==', localStorage.getItem("UID"))).valueChanges();
		// this.doctor = this.doctors[0];
		return this.doctors;
	}

	addDoctor(doctor: Doctor){
		console.log(doctor);
		// this.doctorsCollection.add(doctor);
		this.doctorsCollection.doc(doctor.id).set(doctor);
  	}
  
  	deleteDoctor(doctor: Doctor){
    	this.doctorsDocument = this.afs.doc(`patients/${doctor.id}`);
		this.doctorsDocument.delete();
	}

	updateDoctor(doctor: Doctor){
		this.doctorsDocument = this.afs.doc(`patients/${doctor.id}`);
		this.doctorsDocument.update(doctor);
	}

}
