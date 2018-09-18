import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHealthProfileAllergyComponent } from './pd-health-profile-allergy.component';

describe('PdHealthProfileAllergyComponent', () => {
  let component: PdHealthProfileAllergyComponent;
  let fixture: ComponentFixture<PdHealthProfileAllergyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdHealthProfileAllergyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHealthProfileAllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
