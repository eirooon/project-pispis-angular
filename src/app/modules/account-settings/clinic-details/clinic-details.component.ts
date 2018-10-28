import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClinicService } from '../../../shared/service/clinic.service';
import { ClinicScheduleModel } from '../../../shared/models/clinicScheduleModel';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';
import { Logger } from '../../../shared/service/logger.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Clinic } from '../../../shared/models/clinicModel';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})

export class ClinicDetailsComponent implements OnInit {
  @ViewChild('clinicScheduleModalFromDetails') 
  public cinicScheduleModalTemplate: ModalTemplate<IContext, string, string>

  myTitle = "Clinic";
  CLASSNAME: string = this.constructor.name;

  clinicScheduleCollection: AngularFirestoreCollection<ClinicScheduleModel>;
  clinicSchedule: Observable<ClinicScheduleModel[]>;
  clinicScheduleDoc: AngularFirestoreDocument<ClinicScheduleModel>;
  hasList: boolean = false;
  state: string = '';
  clinicScheduleList: ClinicScheduleModel[];
  clinicScheduleItem: ClinicScheduleModel;
  selectedClinic : Clinic;
  isAddSelected: boolean = false;
  modalTitle: string = "";

  constructor(
    private location: Location,
    public afs: AngularFirestore,
    private clinicService: ClinicService,
    public modalService: SuiModalService,
    private logger: Logger
  ) { }

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

  /**
   * Method: ngOnInit
   * Description: Load upon initialization
   * @return void
   */
  ngOnInit() {
    this.selectedClinic  = this.clinicService.getSelectedClinic();
    if(this.selectedClinic){
      this.clinicname.setValue(this.selectedClinic.clinicname);
      this.phone.setValue(this.selectedClinic.phone);
      this.mobile.setValue(this.selectedClinic.mobile);
      this.province.setValue(this.selectedClinic.province);
      this.city.setValue(this.selectedClinic.city);
      this.hospital.setValue(this.selectedClinic.hospital);
      this.roomnumber.setValue(this.selectedClinic.roomnumber);
      this.logger.info(this.CLASSNAME, "ngOnInit", "clinicname" + this.selectedClinic.clinicname);
    }
    this.clinicService.getClinicsSchedule()
      .subscribe(item => {
        if (item.length > 0) {
          this.hasList = true;
          this.clinicScheduleList = item;
          this.logger.info(this.CLASSNAME, "ngOnInit", "ClinicSchedule data: " + this.clinicScheduleList);
        } else {
          this.hasList = false;
        }
      },
        err => {
          this.logger.info(this.CLASSNAME, "ngOnInit", "Error: " + err.message);
          this.hasList = false;
        },
    );
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
   * Method: phone
   * Description: Get clinic phone
   * @return phone
   */
  get phone() {
    return this.clinicForm.get('phone');
  }

  /**
   * Method: mobile
   * Description: Get clinic mobile
   * @return mobile
   */
  get mobile() {
    return this.clinicForm.get('mobile');
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
   * Method: openClinicScheduleFromDetails
   * Description: Open and view clinic schedules
   * @return void
   */
  public openClinicScheduleFromDetails(isAddSelected:boolean) {
    console.log("OPEN ADD CLINIC SCHEDULE FROM DETAILS");
    const config = new TemplateModalConfig<IContext, string, string>(this.cinicScheduleModalTemplate);

    if(isAddSelected){
      console.log('Add Selected');
      this.modalTitle = "Add Clinic Schedule";
    }else{
      console.log('Edit Selected');
      this.modalTitle = "Edit Clinic Schedule";
    }
    
    config.closeResult = "closed!";
    this.modalService
      .open(config)
      .onApprove(result => {
        this.addClinicSchedule();
      })
      .onDeny(result => {
        this.logger.info(this.CLASSNAME, "openClinicScheduleFromDetails", "Cancel");
      });
  }

  /**
   * Method: addClinicSchedule
   * Description: Add clinic schedule
   * @return void
   */
  addClinicSchedule() {

  }
  editClinicSchedule() {

  }
}
