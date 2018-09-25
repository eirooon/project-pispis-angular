import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConsultationSelectionComponent } from './pd-consultation-selection.component';

describe('PdConsultationSelectionComponent', () => {
  let component: PdConsultationSelectionComponent;
  let fixture: ComponentFixture<PdConsultationSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdConsultationSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConsultationSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
