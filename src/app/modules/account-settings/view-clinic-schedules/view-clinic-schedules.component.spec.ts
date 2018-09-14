import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClinicSchedulesComponent } from './view-clinic-schedules.component';

describe('ViewClinicSchedulesComponent', () => {
  let component: ViewClinicSchedulesComponent;
  let fixture: ComponentFixture<ViewClinicSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClinicSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClinicSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
