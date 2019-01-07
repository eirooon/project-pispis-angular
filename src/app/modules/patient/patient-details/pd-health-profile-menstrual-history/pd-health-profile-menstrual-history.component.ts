import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Logger } from '../../../../shared/service/logger.service';
import { Menstrual } from '../../../../shared/models/menstrualModel';
import { MenstrualService } from '../../../../shared/service/menstrual.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-health-profile-menstrual-history',
  templateUrl: './pd-health-profile-menstrual-history.component.html',
  styleUrls: ['./pd-health-profile-menstrual-history.component.css']
})
export class PdHealthProfileMenstrualHistoryComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  menstrual: Menstrual;
  ptnForm: any;
  isEdit: boolean;

  constructor(
    private location: Location,
    private menstrualService: MenstrualService,
    private logger: Logger,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.ngOnInit();
    this.initializeMenstrual();

    this.isEdit = menstrualService.getIsEdit();
    if (this.isEdit) {
      this.menstrual = this.menstrualService.getMenstrual();
    }
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Health Profile Menstrual History Load");
    // this.ptnForm = this.formBuilder.group({
    //   allergyType: [''],
    //   allergyKind: [''],
    //   allergySeverity: [''],
    //   allergyReaction: [''],
    // });
  }

  initializeMenstrual() {
    this.menstrual = {
      id: '',
      menarche: 0,
      avgduration: 0,
      interval: '',
      dysmenorrhea: '',
      cycleduration: 0,
      avgnapkins: 0,
      lastperiodfrom: new Date(),
      lastperiodto: new Date(),
      prevperiodfrom: new Date(),
      prevperiodto: new Date(),
      agemenopause: 0,
      patientId: localStorage.getItem("ptId"),
    }
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.menstrualService.setIsEdit(false);
    this.location.back();
  }

  /**
   * Method: addMenstrual
   * Description: Adds new patient Menstrual History
   * @return void
   */
  addMenstrual() {
    if (!this.isEdit) {
      this.menstrualService.addMenstrual(this.menstrual);
      this.logger.info(this.CLASSNAME, "addMenstrual", "Menstrual ID: [" + this.menstrual.id + "] Adding done");
      this.router.navigate(['/patient/patient-details']);
    } else {
      this.editMenstrual();
    }

  }

  /**
   * Method: editMenstrual
   * Description: Updates existing Menstrual History
   * @return void
   */
  editMenstrual() {
    this.menstrualService.updateMenstrual(this.menstrual);
    this.logger.info(this.CLASSNAME, "editMenstrual", "Menstrual ID: [" + this.menstrual.id + "] Update done");
    this.router.navigate(['/patient/patient-details']);
  }
}
