import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Logger } from '../../../../shared/service/logger.service';
import { Allergy } from '../../../../shared/models/allergyModel';
import { AllergyService } from '../../../../shared/service/allergy.service';
import { PatientService } from '../../../../shared/service/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pd-health-profile-allergy',
  templateUrl: './pd-health-profile-allergy.component.html',
  styleUrls: ['./pd-health-profile-allergy.component.css']
})
export class PdHealthProfileAllergyComponent implements OnInit {

  CLASSNAME: string = this.constructor.name;

  allergy: Allergy;
  ptnForm: any;
  isEdit: boolean;

  constructor(
    private allergyService: AllergyService,
    private patientService: PatientService,
    private location: Location,
    private logger: Logger,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.ngOnInit();
    this.initializeAllergy();
    this.isEdit = allergyService.getIsEdit();
    if(this.isEdit) {
      this.allergy = this.allergyService.getAllergy();
    }
  }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.logger.info(this.CLASSNAME, "ngOnInit", "Patient Health Profile Allergy Load");
    this.ptnForm = this.formBuilder.group({
      allergyType: [''],
      allergyKind: [''],
      allergySeverity: [''],
      allergyReaction: [''],
    });
  }

  initializeAllergy() {
    this.allergy = {
      id: '',
      allergyType: '',
      allergyKind: '',
      allergySeverity: '',
      allergyReaction: '',
      patientId: localStorage.getItem("ptId"),
    }
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
    this.allergyService.setIsEdit(false);
  }

  /**
   * Method: addAllergy
   * Description: Adds new patient allergy
   * @return void
   */
  addAllergy() {
    //Check for valid inputs
    this.allergyService.addAllergy(this.allergy);
    this.logger.info(this.CLASSNAME, "addAllergy", "Allergy ID: [" + this.allergy.id + "] Adding done");
    this.router.navigate(['/patient/patient-details']);
  }

  /**
   * Method: editAllergy
   * Description: Updates existing patient allergy
   * @return void
   */
  editAllergy() {
    this.allergyService.updateAllergy(this.allergy);
    this.logger.info(this.CLASSNAME, "updateAllergy", "Allergy ID: [" + this.allergy.id + "] Update done");
    this.router.navigate(['/patient/patient-details']);
  }
}
