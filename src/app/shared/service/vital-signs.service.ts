import { Injectable } from "@angular/core"; 
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Logger } from './logger.service';
import { VitalsModel } from "../models/vitalsModel";

@Injectable()
export class VitalSignsService {

    vitalsCollection: AngularFirestoreCollection<VitalsModel>;
	vitalsData: Observable<VitalsModel[]>;

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
	 * Method: addVitals
	 * Description: Adds new vitals
	 * @param vitals 
	 * @return void
	 */
	addVitals(vitals: VitalsModel) {
		this.logger.info(this.CLASSNAME, "addVitals", "Vitals: " + vitals.id);
		this.vitalsCollection.add(vitals);
	}

	/**
	 * Method: getVitals
	 * Description: Gets the list of all vitals added
	 * @param idPatient 
	 * @return void
	 */
	getVitals(idPatient: String) {
		this.logger.info(this.CLASSNAME, "getVitals", idPatient.toString());
		if (idPatient != null) {
			this.vitalsCollection = this.afs.collection('vitals', ref => ref.where('idPatient', '==', idPatient));
			this.vitalsData = this.vitalsCollection.snapshotChanges()
				.map(changes => {
					return changes.map(a => {
						const data = a.payload.doc.data() as VitalsModel;
						data.id = a.payload.doc.id;
						console.log(data);
						return data;
					})
				});
			this.logger.info(this.CLASSNAME, "getVitals", "Vitals " + this.vitalsData);
			return this.vitalsData;
		}
	}

}
