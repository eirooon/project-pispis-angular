import { Injectable } from "@angular/core"; import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Clinic } from '../models/clinicModel';
import { ClinicScheduleModel } from "../models/clinicScheduleModel";
import { Logger } from './logger.service';

@Injectable()
export class ClinicService {

  clinicsCollection: AngularFirestoreCollection<Clinic>;
  clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;

  clinic: Observable<Clinic[]>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;

  hasList: boolean = true;
  state: string = '';

  clinics: Clinic[];
  idClinic: string;
  selectedClinic: Clinic;
  CLASSNAME: string = this.constructor.name;

  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private logger: Logger
  ) { }


  /**
   * Method: addClinic
   * Description: Adds new clinic information
   */
  addClinic() {

  }

  /**
   * Method: addClinicSchedule
   * Description: Adds new clinic schedule
   */
  addClinicSchedule() {

  }

  /**
   * Method: getClinics
   * Description: Adds new clinic schedule
   * @return clinic
   */
  getClinics() {
    this.logger.info(this.CLASSNAME, "getClinics", "UID Doctor: [" + localStorage.getItem("UID") + "]");
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
    return this.clinic;
  }


  /**
   * Method: getClinicsSchedule
   * Description: This method will get a list of clinic schedules based on a specific clinic ID
   * @return clinicSchedule
   */
  getClinicsSchedule() {
    this.logger.info(this.CLASSNAME, "getClinicsSchedule", "Clinic ID: " + this.idClinic);
    this.clinicScheduleCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID"))).doc(this.idClinic).collection('clinicSchedule');
    this.clinicSchedule = this.clinicScheduleCollection.snapshotChanges()
      .map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as ClinicScheduleModel;
          data.id = a.payload.doc.id;
          return data;
        })
      });
    this.logger.info(this.CLASSNAME, "getClinicsSchedule", "Clinic Schedule: " + this.clinicSchedule);
    return this.clinicSchedule;
  }

  /**
   * Method: setClinicID
   * Description: Sets clinic ID
   * @param id 
   * @return idClinic 
   */
  setClinicID(id: string) {
    this.logger.info(this.CLASSNAME, "setClinicID", "Clinic ID: " + id);
    this.idClinic = id;
  }

  /**
   * Method: getClinicID
   * Description: Gets clinic ID
   * @return idClinic 
   */
  getClinicID() {
    this.logger.info(this.CLASSNAME, "getClinicID", "Clinic ID: " + this.idClinic);
    return this.idClinic;
  }

  /**
   * Description: Sets currently selected Clinic
   * @param clinic 
   */
  setSelectedClinic(clinic: Clinic){
      this.selectedClinic = clinic;
  }

  /**
   * Description: Gets currently selected Clinic
   * @return selectedClinic 
   */
  getSelectedClinic(){
    return this.selectedClinic;
  }

  updateClinics(clinicData: Clinic) {
    this.logger.info(this.CLASSNAME, "updateClinics", "UID Doctor: [" + localStorage.getItem("UID") + "]");
    console.log(clinicData);
    this.clinicsCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));

    var clinic = this.clinicsCollection.doc(clinicData.id);
    clinic.update({
      clinicname:clinicData.clinicname,
      phone:clinicData.phone,
      mobile:clinicData.mobile,
      province:clinicData.province,
      city:clinicData.city,
      hospital:clinicData.hospital,
      roomnumber:clinicData.roomnumber,
      clinicSchedule:{ }
    }).then(function() {
      console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        return false;
    });

    return true;
  }

  updateClinicSchedule(clinicId: string, clinicSchedule: ClinicScheduleModel){
    this.logger.info(this.CLASSNAME, "updateClinicSchedule", "clinicId" + clinicId + "clinicSchedule.id" +  clinicSchedule.id);

    this.clinicsCollection = this.afs.collection('clinics', ref => ref.where('idDoc', '==', localStorage.getItem("UID")));

    this.clinicsCollection.doc(clinicId).collection('clinicSchedule').doc(clinicSchedule.id).update({
      clinicDay: clinicSchedule.clinicDay,
      clinicType: clinicSchedule.clinicType,
      endTime: clinicSchedule.endTime,
      startTime: clinicSchedule.startTime,
    }).then(function(){
      console.log("Document successfully updated!");
    }).catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
      return false;
    });
    return true;
  }

}