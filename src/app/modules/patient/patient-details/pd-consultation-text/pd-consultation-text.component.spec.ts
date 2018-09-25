import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConsultationTextComponent } from './pd-consultation-text.component';

describe('PdConsultationTextComponent', () => {
  let component: PdConsultationTextComponent;
  let fixture: ComponentFixture<PdConsultationTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdConsultationTextComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConsultationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
