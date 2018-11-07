import { Injectable } from "@angular/core"; 
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Logger } from './logger.service';
import { VitalsModel } from "../models/vitalsModel";

@Injectable()
export class VitalSignsService {

  vitalsCollection: AngularFirestoreCollection<VitalsModel>;
	consultationTexts: Observable<VitalsModel[]>;

	patientDoc: AngularFirestoreDocument<VitalsModel>;
	vitals: VitalsModel;
	isconsultationTextEdit: boolean = false;
	CLASSNAME: string = this.constructor.name;

	constructor(
		public afs: AngularFirestore,
		private logger: Logger
	) {
		this.vitalsCollection = this.afs.collection('vitals', x => x.orderBy('clinicname', 'asc'));

	}

	/**
	 * Method: addConsultationText
	 * Description: Adds new consultation text
	 * @param consultation 
	 * @return void
	 */
	addVitals(vitals: VitalsModel) {
		this.logger.info(this.CLASSNAME, "addVitals", "Consulation: " + vitals.id);
		this.vitalsCollection.add(vitals);
	}

}
