import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models/patient';
import { Logger } from './logger.service';

@Injectable()
export class PatientService {
	patientsCollection: AngularFirestoreCollection<Patient>;
	patientDoc: AngularFirestoreDocument<Patient>;
	patients: Observable<Patient[]>;
	patient: Patient;
	patient2: Observable<Patient>;
	isEdit: boolean = false;

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
	 * Method: setIsEdit
	 * Description: Set edit to true=edit_mode false=not_edit_mode
	 * @param flag
	 * @return void
	 */
	setIsEdit(flag: boolean) {
		this.logger.info(this.CLASSNAME, "setIsEdit", "Flag: " + flag);
		this.isEdit = flag;
	}

	/**
	 * Method: getIsEdit
	 * Description: Get edit true=edit_mode false=not_edit_mode
	 * @return isEdit
	 */
	getIsEdit() {
		this.logger.info(this.CLASSNAME, "getIsEdit", "Flag: " + this.isEdit);
		return this.isEdit;
	}

	/**
	 * Method: setPatient
	 * Description: Set patient information
	 * @param patient
	 * @return void
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
		this.logger.info(this.CLASSNAME, "getPatient", "Patient: " + this.patient);
		return this.patient;
	}

	getPatientById(id: string) {

		this.logger.warn(this.CLASSNAME, "HAHA","FIRST:" + id);
		this.afs.collection('patients', ref => ref.where('idDoc', '==', localStorage.getItem("UID"))).doc(id).ref.get().then((doc) => {
			if (doc.exists) {
				this.patient = doc.data() as Patient;
				this.logger.warn(this.CLASSNAME, "HAHA","Document dataQ:" + this.patient.id);
				this.logger.warn(this.CLASSNAME, "HAHA","Document data:" + this.patient.birthdate);
			} else {
				this.logger.warn(this.CLASSNAME, "HAHA","No such document!");
			}
		  }).catch(function(error) {
			this.logger.warn(this.CLASSNAME, "HAHA","Error getting document:");
		  });



		
		// // this.logger.warn(this.CLASSNAME, "getPatient", "jobern111");
		// // this.patient = this.afs.collection('patients', ref => ref.where('id', '==', id)).ref;
		// // // this.patients = this.patientsCollection.snapshotChanges()
		// // // 	.map(changes => {
		// // // 		return changes.map(a => {
		// // // 			const data = a.payload.doc.data() as Patient;
		// // // 			data.id = a.payload.doc.id;
		// // // 			return data;
		// // // 		})
		// // // 	});
		// // return this.patient;
		// this.logger.warn(this.CLASSNAME, "HHAHA2", "id" + id);
		// this.patientDoc = this.afs.collection('patients').doc(id);
		// this.patientDoc.ref.get().then((doc) => {
		// 	if (doc.exists) {
		// 		this.patient = doc.data() as Patient;
		// 	} else {
		// 		this.logger.warn(this.CLASSNAME, "HAHA", "HUHU");
		// 	}
		// }).catch(function(error) {

		// });

		//this.logger.warn(this.CLASSNAME, "HAHA", "reached!" + this.patient.emgy_lastname);
		return this.patient;
	}
}