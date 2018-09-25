import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClinicSchedulesComponent } from './add-clinic-schedules.component';

describe('AddClinicSchedulesComponent', () => {
  let component: AddClinicSchedulesComponent;
  let fixture: ComponentFixture<AddClinicSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddClinicSchedulesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClinicSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
