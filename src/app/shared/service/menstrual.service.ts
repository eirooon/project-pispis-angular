import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Menstrual } from '../models/menstrualModel';
import { Logger } from './logger.service';

@Injectable()
export class MenstrualService {

	menstrualCollection: AngularFirestoreCollection<Menstrual>;
	menstrualDocument: AngularFirestoreDocument<Menstrual>;
	menstruals: Observable<Menstrual[]>;
	menstrual: Menstrual;
	isEdit: boolean;
	menstrualId: string;

	CLASSNAME: string = this.constructor.name;

	constructor(
		public afs: AngularFirestore,
		private logger: Logger
	) {
		this.menstrualCollection = this.afs.collection('menstrual');
	}

	/**
	 * Method: addMenstrual
	 * Description: Add new patient Menstrual history
	 * @param menstrual
	 * @return void
	 */
	addMenstrual(menstrual: Menstrual) {
		this.logger.info(this.CLASSNAME, "addMenstrual", "Menstrual Id: " + menstrual.id);
		this.menstrualCollection.add(menstrual);
	}

	/**
	 * Method: deleteMenstrual
	 * Description: Remove patient Menstrual history
	 * @param menstrual
	 * @return void
	 */
	deleteMenstrual(menstrual: Menstrual) {
		this.logger.info(this.CLASSNAME, "deleteMenstrual", "Menstrual Id: " + menstrual.id);
		this.menstrualDocument = this.afs.doc(`menstrual/${menstrual.id}`);
		this.menstrualDocument.delete();
	}

	/**
	 * Method: updateMenstrual
	 * Description: Updates patient Menstrual history
	 * @param allergy
	 * @return void
	 */
	updateMenstrual(menstrual: Menstrual) {
		this.logger.info(this.CLASSNAME, "updateMenstrual", "Menstrual Id: " + menstrual.id);
		this.menstrualDocument = this.afs.doc(`menstrual/${menstrual.id}`);
		this.menstrualDocument.update(menstrual);
		this.isEdit = false;
	}

	/**
	 * Method: setMenstrual
	 * Description: Set patient patient Menstrual history
	 */
	setMenstrual(menstrual: Menstrual) {
		this.logger.info(this.CLASSNAME, "setMenstrual", "Menstrual: " + menstrual.agemenopause);
		this.menstrual = menstrual;
		this.isEdit = true;
	}

	/**
	 * Method: getMenstrual
	 * Description: Get patient Menstrual history
	 * @return menstrual
	 */
	getMenstrual() {
		this.logger.info(this.CLASSNAME, "getMenstrual", "Menstrual: " + this.menstrual.id);
		return this.menstrual;
	}

	/**
	 * Method: getIsEdit
	 * Description: Get if Update is Active
	 * @return boolean
	 */
	getIsEdit() {
		return this.isEdit;
	}

	/**
	 * Method: setIsEdit
	 * Description: Set allergy state if edit
	 * @return boolean
	 */
	setIsEdit(flag: boolean) {
		this.isEdit = flag;
	}

	getMenstrualInformationByPatientId() {
		this.afs.collection('menstrual', ref => ref.where('patientId', '==', localStorage.getItem("ptId"))).ref.get().then((snapshot) => {
			snapshot.docs.forEach(doc => {
				if (doc.exists) {
					this.logger.info(this.CLASSNAME, "getMenstrualInformationByPatientId", "Document Exists: " + doc.id);
					this.menstrual = doc.data() as Menstrual;
					this.logger.info(this.CLASSNAME, "getMenstrualInformationByPatientId", "Document Exists: " + this.menstrual.agemenopause);
					this.logger.info(this.CLASSNAME, "getMenstrualInformationByPatientId", "Document Exists: " + this.menstrual.menarche);
				} else {
					this.logger.warn(this.CLASSNAME, "getMenstrualInformationByPatientId", "No such document!");
				}
			})
		}).catch(function (error) {
			this.logger.errpr(this.CLASSNAME, "getMenstrualInformationByPatientId", "Error getting document!");
		});

		return this.menstrual;
	}
}
