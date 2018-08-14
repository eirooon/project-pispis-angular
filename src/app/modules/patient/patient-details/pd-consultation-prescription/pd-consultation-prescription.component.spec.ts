import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConsultationPrescriptionComponent } from './pd-consultation-prescription.component';

describe('PdConsultationPrescriptionComponent', () => {
  let component: PdConsultationPrescriptionComponent;
  let fixture: ComponentFixture<PdConsultationPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdConsultationPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConsultationPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
