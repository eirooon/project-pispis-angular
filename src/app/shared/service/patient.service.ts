import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models/patient';

@Injectable()
export class PatientService {
	patientsCollection: AngularFirestoreCollection<Patient>;
	patients: Observable<Patient[]>;
	patientDoc: AngularFirestoreDocument<Patient>;
	patient: Patient;
	isEdit: boolean = false;

  	constructor(
	  	public afs: AngularFirestore
		) {
			this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc','==', localStorage.getItem("UID")));
			this.patients = this.patientsCollection.snapshotChanges()
			.map(changes => {
				return changes.map(a => {
					const data = a.payload.doc.data() as Patient;
					data.id = a.payload.doc.id;
					return data;
				})
			});
	}

	getPatients(){
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

	loadRecentAddedPatients(){
		this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc','==', localStorage.getItem("UID")).limit(4));
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

	loadSearchPatients(start, end){
		this.patientsCollection = this.afs.collection('patients', ref => ref.limit(4).orderBy('firstname').startAt(start).endAt(end));
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
		this.patientsCollection.add(patient);
  	}
  
  	deletePatient(patient: Patient){
    	this.patientDoc = this.afs.doc(`patients/${patient.id}`);
		this.patientDoc.delete();
	}

	updatePatient(patient: Patient){
		this.patientDoc = this.afs.doc(`patients/${patient.id}`);
		this.patientDoc.update(patient);
	}

	setIsEdit(flag: boolean){
		this.isEdit = flag;
	}

	getIsEdit(){
		return this.isEdit;
	}

	setPatient(patient: Patient){
		this.patient = patient;
	}

	getPatient(){
		return this.patient;
	}
}