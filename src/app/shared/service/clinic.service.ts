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


    constructor(
        private location: Location,
        public afs: AngularFirestore
      ) { }

    addClinic(){

    }

    addClinicSchedule(){
        
    }


    getClinics() {
        console.log("getClinics() from Service");
        console.log("UID DOCTOR: [" + localStorage.getItem("UID") + "]");
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


      getClinicsSchedule(clinincIDparam:string) {
        console.log("getClinics() from Service");
        console.log("UID DOCTOR: [" + localStorage.getItem("UID") + "]");

        this.clinicScheduleCollection = this.afs.collection('clinics').doc(clinincIDparam).collection('clinicSchedule');
        this.clinicSchedule = this.clinicScheduleCollection.snapshotChanges()
          .map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as ClinicScheduleModel;
              data.id = a.payload.doc.id;
              console.log(data);
              return data;
            })
          });
        console.log(this.clinic);
        return this.clinic;
      }


      
}