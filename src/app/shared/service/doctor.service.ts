import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Doctor } from '../models/doctorModel';
import { Logger } from './logger.service';

@Injectable()
export class DoctorService {

	doctorsCollection: AngularFirestoreCollection<Doctor>;
	doctorsDocument: AngularFirestoreDocument<Doctor>;
	doctors: Observable<Doctor[]>;
	doctor: Doctor;

	CLASSNAME: string = this.constructor.name;

	constructor(
		public afs: AngularFirestore,
		private logger: Logger
	) {
		this.doctorsCollection = this.afs.collection('doctors');
	}

	/**
	 * Method: getDoctorsName
	 * Description: Retrieve Doctors name
	 * @return doctors
	 */
	getDoctorsName() {
		this.logger.info(this.CLASSNAME, "getDoctorsName", "Retrieve Doctors name");
		this.doctorsCollection = this.afs.collection('doctors', ref => ref.where('uid', '==', localStorage.getItem("UID")));
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

	/**
	 * Method: getDoctor
	 * Description: Retrieve Doctor Informations
	 * @return doctors
	 */
	getDoctor() {
		this.logger.info(this.CLASSNAME, "getDoctor", "Retrieve Doctor Information DoctorID:["+localStorage.getItem("UID")+"]");
		this.doctors = this.afs.collection('doctors', ref => ref.where('uid', '==', localStorage.getItem("UID"))).valueChanges();
		return this.doctors;
	}

	/**
	 * Method: addDoctor
	 * Description: Adds Doctor Informations
	 * @param doctor
	 * @return void
	 */
	addDoctor(doctor: Doctor) {
		this.logger.info(this.CLASSNAME, "addDoctor", "Doctor ID: " + doctor.id);
		this.doctorsCollection.doc(doctor.id).set(doctor);
	}

	/**
	 * Method: deleteDoctor
	 * Description: Removes Doctor Informations
	 * @param doctor
	 * @return void
	 */
	deleteDoctor(doctor: Doctor) {
		this.logger.info(this.CLASSNAME, "deleteDoctor", "Doctor ID: " + doctor.id);
		this.doctorsDocument = this.afs.doc(`patients/${doctor.id}`);
		this.doctorsDocument.delete();
	}

	/**
	 * Method: updateDoctor
	 * Description: Updates Doctor Informations
	 * @param doctor
	 * @return void
	 */
	updateDoctor(doctor: Doctor) {
		this.logger.info(this.CLASSNAME, "updateDoctor", "Doctor ID: " + doctor.id);
		this.doctorsDocument = this.afs.doc(`doctors/${doctor.id}`);
		this.doctorsDocument.update(doctor);
	}

}
