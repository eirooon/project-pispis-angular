import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDetailsComponent } from './clinic-details.component';

describe('ClinicDetailsComponent', () => {
  let component: ClinicDetailsComponent;
  let fixture: ComponentFixture<ClinicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
