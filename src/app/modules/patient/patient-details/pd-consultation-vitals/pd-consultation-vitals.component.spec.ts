import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConsultationVitalsComponent } from './pd-consultation-vitals.component';

describe('PdConsultationVitalsComponent', () => {
  let component: PdConsultationVitalsComponent;
  let fixture: ComponentFixture<PdConsultationVitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdConsultationVitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConsultationVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
