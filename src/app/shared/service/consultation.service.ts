import { Injectable } from "@angular/core"; import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ConsultationTextModel } from '../models/consulationModel';
import { Logger } from './logger.service';

@Injectable()
export class ConsultationService {

	consultationTextCollection: AngularFirestoreCollection<ConsultationTextModel>;
	consultationTexts: Observable<ConsultationTextModel[]>;

	patientDoc: AngularFirestoreDocument<ConsultationTextModel>;
	consultationText: ConsultationTextModel;
	isconsultationTextEdit: boolean = false;
	CLASSNAME: string = this.constructor.name;

	constructor(
		public afs: AngularFirestore,
		private logger: Logger
	) {
		this.consultationTextCollection = this.afs.collection('consultation', x => x.orderBy('clinicname', 'asc'));

	}

	/**
	 * Method: addConsultationText
	 * Description: Adds new consultation text
	 * @param consultation 
	 * @return void
	 */
	addConsultationText(consultation: ConsultationTextModel) {
		this.logger.info(this.CLASSNAME, "addConsultationText", "Consulation: " + consultation.id);
		this.consultationTextCollection.add(consultation);
	}

	/**
	 * Method: getConsultationText
	 * Description: Get consultation Text
	 * @param idPatient 
	 * @return consultationTexts
	 */
	getConsultationText(idPatient: String) {
		if (idPatient != null) {
			this.consultationTextCollection = this.afs.collection('consultation', ref => ref.where('idPatient', '==', idPatient));
			this.consultationTexts = this.consultationTextCollection.snapshotChanges()
				.map(changes => {
					return changes.map(a => {
						const data = a.payload.doc.data() as ConsultationTextModel;
						data.id = a.payload.doc.id;
						console.log(data);
						return data;
					})
				});
			this.logger.info(this.CLASSNAME, "getConsultationText", "Consulation Texts: " + this.consultationTexts);
			return this.consultationTexts;
		}
	}
}