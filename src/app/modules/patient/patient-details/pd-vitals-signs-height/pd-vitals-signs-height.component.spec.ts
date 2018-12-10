import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdVitalsSignsHeightComponent } from './pd-vitals-signs-height.component';

describe('PdVitalsSignsHeightComponent', () => {
  let component: PdVitalsSignsHeightComponent;
  let fixture: ComponentFixture<PdVitalsSignsHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdVitalsSignsHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdVitalsSignsHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
