import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsHeadCircumferenceComponent } from './pd-vitals-signs-head-circumference.component';

describe('PdVitalsSignsHeadCircumferenceComponent', () => {
  let component: PdVitalsSignsHeadCircumferenceComponent;
  let fixture: ComponentFixture<PdVitalsSignsHeadCircumferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsHeadCircumferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsHeadCircumferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
