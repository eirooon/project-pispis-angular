import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConsultationComponent } from './pd-consultation.component';

describe('PdConsultationComponent', () => {
  let component: PdConsultationComponent;
  let fixture: ComponentFixture<PdConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
