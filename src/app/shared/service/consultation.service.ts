import { Injectable } from "@angular/core";import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ConsultationTextModel } from '../models/consulationModel';

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
	  
	getConsultationText(idPatient:String){
		console.log("getConsultationText() from Service");
		if(idPatient!=null){
			this.consultationTextCollection = this.afs.collection('consultation', ref => ref.where('idPatient', '==', idPatient).orderBy('date','desc'));
			this.consultationTexts = this.consultationTextCollection.snapshotChanges()
				.map(changes => {
					return  changes.map(a => {
						const data = a.payload.doc.data() as ConsultationTextModel;
						data.id = a.payload.doc.id;
						console.log(data);
						return data;
					})
			});
			console.log(this.consultationTexts);
			return this.consultationTexts;
		}
	}
}