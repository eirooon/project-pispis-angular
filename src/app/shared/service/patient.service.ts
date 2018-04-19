import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models/patient';

@Injectable()
export class PatientService {
	patientsCollection: AngularFirestoreCollection<Patient>;
	patients: Observable<Patient[]>;
	patientDoc: AngularFirestoreDocument<Patient>;


  constructor(
	  public afs: AngularFirestore
	) { 
  	}
  
  getPatients(){
	console.log("UID DOCTOR: [" + localStorage.getItem("UID") + "]");
	this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc','==', localStorage.getItem("UID")));
	this.patients = this.patientsCollection.snapshotChanges()
		.map(changes => {
		return changes.map(a => {
			const data = a.payload.doc.data() as Patient;
			data.id = a.payload.doc.id;
			return data;
		})
});
	return this.patients;
  }
  
  addPatient(patient: Patient){
	  return this.patientsCollection.add(patient)
	  .catch(error => 
		{
			throw error
		});
  }
  
  deletePatient(patient: Patient){
    console.log(patient.id);
    this.patientDoc = this.afs.doc('patients/${patient.id}');
    this.patientDoc.delete();
	}
}