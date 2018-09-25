import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../shared/service/auth.service';
import { AllProvince } from '../../../shared/constantValues/provinceConstants';
import { AllCity } from '../../../shared/constantValues/cityConstants';
import { AllHospitals } from '../../../shared/constantValues/hospitalConstants';
import { Router } from '@angular/router';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { Clinic } from '../../../shared/models/clinicModel';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { AllDaysOfTheWeek } from '../../../shared/constantValues/daysOfTheWeekConstants';
import { Logger } from '../../../shared/service/logger.service';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css'],
})


export class AddClinicComponent implements OnInit {
  @ViewChild('addClinicScheduleModal')
  public modalTemplate: ModalTemplate<IContext, string, string>

  CLASSNAME: string = this.constructor.name;

  provinceList = AllProvince;
  cityList = AllCity;
  hospitalList = AllHospitals;
  clinicSchedules: any = {};
  clinicSchedulesList: ClinicScheduleModel[];
  clinic: Clinic;
  daysOfTheWeekList = AllDaysOfTheWeek;

  clinicScheduleModel: ClinicScheduleModel;
  localList = [];
  clinicCollection: AngularFirestoreCollection<any> = this.afs.collection('clinics');
  ptnObserver = this.clinicCollection.valueChanges();

  clinicForm = new FormGroup({
    clinicname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    phone: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    hospital: new FormControl('', Validators.required),
    roomnumber: new FormControl('', Validators.required),
  });

  clinicScheduleForm = new FormGroup({
    clinicDay: new FormControl('', Validators.required),
    clinicType: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required)
  }
  );

  constructor(
    private location: Location,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    public modalService: SuiModalService,
    private logger: Logger
  ) { }

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.clinic = {
      idDoc: '',
      clinicname: '',
      province: '',
      city: '',
      hospital: '',
      roomnumber: '',
    }

    this.clinicScheduleModel = {
      clinicDay: '',
      clinicType: '',
      startTime: '',
      endTime: ''
    }
    this.daysOfTheWeekList = AllDaysOfTheWeek;
  }

  /**
   * Method: clinicDay
   * Description: Get clinic day
   * @return clinicDay
   */
  get clinicname() {
    return this.clinicForm.get('clinicname');
  }

  /**
   * Method: address
   * Description: Get address
   * @return address
   */
  get address() {
    return this.clinicForm.get('address');
  }

  /**
   * Method: province
   * Description: Get province
   * @return province
   */
  get province() {
    return this.clinicForm.get('province');
  }

  /**
   * Method: city
   * Description: Get city
   * @return city
   */
  get city() {
    return this.clinicForm.get('city');
  }

  /**
   * Method: hospital
   * Description: Get hospital
   * @return hospital
   */
  get hospital() {
    return this.clinicForm.get('hospital');
  }

  /**
   * Method: roomnumber
   * Description: Get roomnumber
   * @return roomnumber
   */
  get roomnumber() {
    return this.clinicForm.get('roomnumber');
  }

  /**
   * Method: clinicDay
   * Description: Get clinicDay
   * @return clinicDay
   */
  get clinicDay() {
    return this.clinicScheduleForm.get('clinicDay');
  }

  /**
   * Method: clinicType
   * Description: Get clinicType
   * @return clinicType
   */
  get clinicType() {
    return this.clinicScheduleForm.get('clinicType');
  }

  /**
   * Method: startType
   * Description: Get startTime
   * @return startTime
   */
  get startType() {
    return this.clinicScheduleForm.get('startTime');
  }

  /**
   * Method: endTime
   * Description: Get endTime
   * @return endTime
   */
  get endTime() {
    return this.clinicScheduleForm.get('endTime');
  }

  /**
   * Method: goBack
   * Description: Go back to previous page
   * @return void
   */
  goBack() {
    this.location.back();
  }

  /**
   * Method: addClinic
   * Description: Add new clinic
   * @return void
   */
  addClinic() {
    if (this.clinicForm.valid) {
      this.clinicCollection.add({
        idDoc: this.authService.getUidOfCurrentDoctor(),
        clinicname: this.clinicForm.value.clinicname,
        province: this.clinicForm.value.province,
        city: this.clinicForm.value.city,
        hospital: this.clinicForm.value.hospital,
        roomnumber: this.clinicForm.value.roomnumber,
      })
        .then((docRef) => {
          this.clinicCollection.doc(docRef.id).update({
            prodid: docRef.id
          })
          if (this.clinicSchedulesList) {
            this.afs.collection('clinics').doc(docRef.id).collection('clinicSchedule').add({
              clinicSchedule: this.clinicSchedulesList
            })
          }

          this.logger.info(this.CLASSNAME, "addClinic", "Clinic schedule list: " + this.clinicSchedulesList);
          this.logger.info(this.CLASSNAME, "addClinic", "Doc Ref: " + docRef.id);
          this.goBack();
        })
        .catch(function (error) {
          this.logger.error(this.CLASSNAME, "addClinic", "Error: " + error);
        });
    } else {
      this.logger.error(this.CLASSNAME, "addClinic", "Form is invalid");
    }
  }

  /**
   * Method: openClinicSchedule
   * Description: Open Clinic Schedule
   * @return void
   */
  public openClinicSchedule() {
    this.logger.info(this.CLASSNAME, "openClinicSchedule", "Clinic Open Schedule");
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    this.modalService
      .open(config)
      .onApprove(result => {
        this.addClinicSchedule();
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openClinicSchedule", "Cancel");
      });
  }

  /**
   * Method: addClinicSchedule
   * Description: Add Clinic Schedule
   * @return void
   */
  addClinicSchedule() {
    this.logger.info(this.CLASSNAME, "addClinicSchedule", "Add Clinic Schedule");
    if (this.clinicScheduleForm.valid) {
      //check if object is in storage
      this.clinicScheduleModel = {
        clinicDay: '',
        clinicType: '',
        startTime: '',
        endTime: ''
      }
      this.clinicScheduleModel.clinicDay = this.clinicScheduleForm.value.clinicDay;
      this.clinicScheduleModel.clinicType = this.clinicScheduleForm.value.clinicType;
      this.clinicScheduleModel.startTime = this.clinicScheduleForm.value.startTime;
      this.clinicScheduleModel.endTime = this.clinicScheduleForm.value.endTime;
      this.localList.push(this.clinicScheduleModel);
      this.clinicSchedulesList = this.localList;
      this.logger.info(this.CLASSNAME, "addClinic", "Clinic schedule list: " + this.clinicSchedulesList);
      this.removeDocument(this.clinicScheduleModel.clinicDay);
      this.resetForm();
    }
  }

  /**
   * Method: removeDocument
   * Description: Remove document
   * @param doc 
   * @return void
   */
  removeDocument(doc) {
    this.logger.info(this.CLASSNAME, "addClinic", "Document: " + doc);
    this.daysOfTheWeekList.forEach((item, index) => {
      if (item.day == doc) {
        this.daysOfTheWeekList.splice(index, 1);
      }
    });
  }

  /**
   * Method: resetForm
   * Description: Reset Form
   * @param doc 
   * @return void
   */
  resetForm() {
    this.logger.info(this.CLASSNAME, "addClinic", "Reset Form");
    this.clinicScheduleForm.reset();
  }
}