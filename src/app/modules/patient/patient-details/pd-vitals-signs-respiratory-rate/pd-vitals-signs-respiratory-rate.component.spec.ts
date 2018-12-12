import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsRespiratoryRateComponent } from './pd-vitals-signs-respiratory-rate.component';

describe('PdVitalsSignsRespiratoryRateComponent', () => {
  let component: PdVitalsSignsRespiratoryRateComponent;
  let fixture: ComponentFixture<PdVitalsSignsRespiratoryRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsRespiratoryRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsRespiratoryRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
