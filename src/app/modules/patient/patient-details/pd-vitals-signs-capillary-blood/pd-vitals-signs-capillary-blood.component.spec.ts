import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsCapillaryBloodComponent } from './pd-vitals-signs-capillary-blood.component';

describe('PdVitalsSignsCapillaryBloodComponent', () => {
  let component: PdVitalsSignsCapillaryBloodComponent;
  let fixture: ComponentFixture<PdVitalsSignsCapillaryBloodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsCapillaryBloodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsCapillaryBloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
