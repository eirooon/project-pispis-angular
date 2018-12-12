import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsBodyTemperatureComponent } from './pd-vitals-signs-body-temperature.component';

describe('PdVitalsSignsBodyTemperatureComponent', () => {
  let component: PdVitalsSignsBodyTemperatureComponent;
  let fixture: ComponentFixture<PdVitalsSignsBodyTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsBodyTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsBodyTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
