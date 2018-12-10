import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsBloodPressureComponent } from './pd-vitals-signs-blood-pressure.component';

describe('PdVitalsSignsBloodPressureComponent', () => {
  let component: PdVitalsSignsBloodPressureComponent;
  let fixture: ComponentFixture<PdVitalsSignsBloodPressureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsBloodPressureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsBloodPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
