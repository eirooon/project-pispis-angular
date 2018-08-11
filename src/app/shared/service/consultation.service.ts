import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { ConsultationTextModel } from "../models/consulationModel";
import { Observable } from "@firebase/util";
import { Injectable } from "@angular/core";

@Injectable()
export class ConsultationService{

    consultationTextCollection: AngularFirestoreCollection<ConsultationTextModel>;
	consultationTexts: Observable<ConsultationTextModel[]>;
	patientDoc: AngularFirestoreDocument<ConsultationTextModel>;
	consultationText: ConsultationTextModel;
	isconsultationTextEdit: boolean = false;

   	constructor(
	  	public afs: AngularFirestore
		) { 
			this.consultationTextCollection = this.afs.collection('consultation', x => x.orderBy('clinicname', 'asc'));

		}

    addConsultationText(consultation: ConsultationTextModel){
		console.log(consultation);
		console.log("addConsultationText() from Service");
		this.consultationTextCollection.add(consultation);
		
		//this.consultationTextCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));
		//this.afs.collection('clinics').doc(consultation.id).collection('clinicSchedule').add({
    }
}