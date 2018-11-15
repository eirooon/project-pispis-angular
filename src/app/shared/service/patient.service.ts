import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models/patientModel';
import { Logger } from './logger.service';

@Injectable()
export class PatientService {
	patientsCollection: AngularFirestoreCollection<Patient>;
	patientDoc: AngularFirestoreDocument<Patient>;
	patients: Observable<Patient[]>;
	patient: Patient;

	CLASSNAME: string = this.constructor.name;

	constructor(
		public afs: AngularFirestore,
		private logger: Logger
	) {
		this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));
		this.patients = this.patientsCollection.snapshotChanges()
			.map(changes => {
				return changes.map(a => {
					const data = a.payload.doc.data() as Patient;
					data.id = a.payload.doc.id;
					return data;
				})
			});
	}

	/**
	 * Method: setPatient
	 * Description: Set patient information
	 */
	setPatient(patient: Patient) {
		this.logger.info(this.CLASSNAME, "setPatient", "Patient: " + patient.id);
		this.patient = patient;
	}

	/**
	 * Method: getPatient
	 * Description: Get patient information
	 * @return patient
	 */
	getPatient() {
		this.logger.info(this.CLASSNAME, "getPatient", "Patient: " + this.patient.id);
		return this.patient;
	}

	/**
	 * Method: getPatients
	 * Description: Get patients list of signed in doctor
	 * @return patients
	 */
	getPatients() {
		this.logger.info(this.CLASSNAME, "getPatients", "Get patients List");
		this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));
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

	/**
	 * Method: loadRecentAddedPatients
	 * Description: Get recent added patients list of signed in doctor
	 * @return patients
	 */
	loadRecentAddedPatients() {
		this.logger.info(this.CLASSNAME, "loadRecentAddedPatients", "Get recent added patients List");
		this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc', '==', localStorage.getItem("UID")).limit(4));
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

	/**
	 * Method: loadSearchPatients
	 * Description: Get searched patients
	 * @param start
	 * @param end
	 * @return patients
	 */
	loadSearchPatients(start, end) {
		this.logger.info(this.CLASSNAME, "loadSearchPatients", "Start: [" + start + "] End: [" + end + "]");
		this.patientsCollection = this.afs.collection('patients', ref => ref.where('idDoc', '==', localStorage.getItem("UID")).limit(4).orderBy('firstname').startAt(start).endAt(end));
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

	/**
	 * Method: addPatient
	 * Description: Add new patient information
	 * @param patient
	 * @return void
	 */
	addPatient(patient: Patient) {
		this.logger.info(this.CLASSNAME, "addPatient", "Patient Id: " + patient.id);
		this.patientsCollection.add(patient);
	}

	/**
	 * Method: deletePatient
	 * Description: Remove patient information
	 * @param patient
	 * @return void
	 */
	deletePatient(patient: Patient) {
		this.logger.info(this.CLASSNAME, "deletePatient", "Patient Id: " + patient.id);
		this.patientDoc = this.afs.doc(`patients/${patient.id}`);
		this.patientDoc.delete();
	}

	/**
	 * Method: updatePatient
	 * Description: Updates patient information
	 * @param patient
	 * @return void
	 */
	updatePatient(patient: Patient) {
		this.logger.info(this.CLASSNAME, "updatePatient", "Patient Id: " + patient.id);
		this.patientDoc = this.afs.doc(`patients/${patient.id}`);
		this.patientDoc.update(patient);
	}

	/**
	 * Method: getPatientById
	 * Description: Get Patient Information by Id
	 * @return patient
	 */
	getPatientById() {
		this.afs.collection('patients', ref => ref.where('idDoc', '==', localStorage.getItem("UID"))).doc(localStorage.getItem("ptId")).ref.get().then((doc) => {
			if (doc.exists) {
				this.patient = doc.data() as Patient;
			} else {
				this.logger.warn(this.CLASSNAME, "getPatientById", "No such document!");
			}
		}).catch(function (error) {
			this.logger.warn(this.CLASSNAME, "getPatientById", "Error getting document!");
		});
		return this.patient;
	}
}