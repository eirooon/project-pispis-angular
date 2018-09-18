import { Injectable } from "@angular/core";import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clinic } from '../models/clinicModel';
import { ClinicScheduleModel } from "../models/clinicScheduleModel";

@Injectable()
export class ClinicService{

    clinicsCollection: AngularFirestoreCollection<Clinic>;
    clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;

    clinic: Observable<Clinic[]>;
    clinicSchedule: Observable<ClinicScheduleModel[]>;

    hasList: boolean = true;
    state: string = '';
    
    clinics: Clinic[];
    idClinic: string;

    constructor(
        private location: Location,
        public afs: AngularFirestore
      ) { }

    addClinic(){

    }

    addClinicSchedule(){
        
    }

    /**
     * This method will get a list of clinics based on a specific doctor ID.
     */
    getClinics() {
        console.log("[Clinic-Get] UID DOCTOR: [" + localStorage.getItem("UID") + "]");
        this.clinicsCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));
        this.clinic = this.clinicsCollection.snapshotChanges()
          .map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as Clinic;
              data.id = a.payload.doc.id;
              console.log(data);
              return data;
            })
          });
        console.log(this.clinic);
        return this.clinic;
      }


      /**
       * This method will get a list of clinic schedules based on a specific clinic ID.
       */
      getClinicsSchedule() {
        console.log("[ClinicSchedule-Get]" , this.idClinic);
        this.clinicScheduleCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID"))).doc(this.idClinic).collection('clinicSchedule');
          this.clinicSchedule = this.clinicScheduleCollection.snapshotChanges()
          .map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as ClinicScheduleModel;
              data.id = a.payload.doc.id;
              console.log("[ClinicSchedule-Get]", data);
              return data;
            })
          });
        console.log("[ClinicSchedule-Get]", this.clinicSchedule);
        return this.clinicSchedule;
      }

      setClinicID(id: string){
        console.log("[ClinicID-Set]",  id);
        this.idClinic =id;
      }

      getClinicID(){
        console.log("[ClinicID-Get]", this.idClinic);
        return this.idClinic;
      }


      
}