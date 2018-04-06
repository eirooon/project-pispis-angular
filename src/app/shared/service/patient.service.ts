import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../models/patient';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class PatientService {
	patientsCollection: AngularFirestoreCollection<Patient>;
	patients: Observable<Patient[]>;
	patientDoc: AngularFirestoreDocument<Patient>;

	uid: string;

  constructor(
	  public afs: AngularFirestore, 
	  private authService: AuthService
	) { 
	//this.patients = this.afs.collection('ptrecords').valueChanges();
	this.uid = this.authService.getUidOfCurrentDoctor();
  	}
  
  getPatients(max){
		this.patientsCollection = this.afs.collection('patients', ref => ref.limit(max).where('idDoc','==', this.uid));
	// /.where('firstname','==','Anthony')
		this.patients = this.patientsCollection.snapshotChanges().map(changes => {
			return changes.map(a => {
				const data = a.payload.doc.data() as Patient;
				data.id = a.payload.doc.id;
				return data;
			})
		});
		return this.patients;
  }
  
  addPatient(patient: Patient){
	  this.patientsCollection.add(patient);
  }
  
  deletePatient(patient: Patient){
    console.log(patient.id);
    this.patientDoc = this.afs.doc('patients/${patient.id}');
    this.patientDoc.delete();
	}
}