import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Allergy } from '../models/allergyModel';
import { Logger } from './logger.service';

@Injectable()
export class AllergyService {

	allergyCollection: AngularFirestoreCollection<Allergy>;
	allergyDocument: AngularFirestoreDocument<Allergy>;
	allergies: Observable<Allergy[]>;
	allergy: Allergy;
	isEdit: boolean;

	CLASSNAME: string = this.constructor.name;

	constructor(
		public afs: AngularFirestore,
		private logger: Logger
	) {
		this.allergyCollection = this.afs.collection('allergy');
	}

	/**
	 * Method: addAllergy
	 * Description: Add new patient allergy
	 * @param allergy
	 * @return void
	 */
	addAllergy(allergy: Allergy) {
		this.logger.info(this.CLASSNAME, "addAllergy", "Allergy Id: " + allergy.id);
		this.allergyCollection.add(allergy);
	}

	/**
	 * Method: deleteAllergy
	 * Description: Remove patient allergy
	 * @param allergy
	 * @return void
	 */
	deleteAllergy(allergy: Allergy) {
		this.logger.info(this.CLASSNAME, "deleteAllergy", "Allergy Id: " + allergy.id);
		this.allergyDocument = this.afs.doc(`allergy/${allergy.id}`);
		this.allergyDocument.delete();
	}

	/**
	 * Method: updateAllergy
	 * Description: Updates patient allergy
	 * @param allergy
	 * @return void
	 */
	updateAllergy(allergy: Allergy) {
		this.logger.info(this.CLASSNAME, "updateAllergy", "Allergy Id: " + allergy.id);
		this.allergyDocument = this.afs.doc(`allergy/${allergy.id}`);
		this.allergyDocument.update(allergy);
		this.isEdit = false;
	}

	/**
	 * Method: getPatientAllergies
	 * Description: Get patients allergy list
	 * @return allergies
	 */
	getAllergies() {
		this.logger.info(this.CLASSNAME, "getAllergies", "Get patient allergy List");
		this.allergyCollection = this.afs.collection('allergy', ref => ref.where('patientId', '==', localStorage.getItem("ptId")));
		this.allergies = this.allergyCollection.snapshotChanges()
			.map(changes => {
				return changes.map(a => {
					const data = a.payload.doc.data() as Allergy;
					data.id = a.payload.doc.id;
					return data;
				})
			});
		return this.allergies;
	}

	/**
	 * Method: setAllergy
	 * Description: Set patient allergy
	 */
	setAllergy(allergy: Allergy){
		this.logger.info(this.CLASSNAME, "setAllergy", "Allergy: " + allergy.id);
		this.allergy = allergy;
		this.isEdit = true;
	}

	/**
	 * Method: getAllergy
	 * Description: Get patient allergy
	 * @return allergy
	 */
	getAllergy(){
		this.logger.info(this.CLASSNAME, "getAllergy", "Allergy: " + this.allergy.id);
		return this.allergy;
	}

	getIsEdit(){
		return this.isEdit;
	}

	setIsEdit(flag: boolean){
		this.isEdit = flag;
	}
}
