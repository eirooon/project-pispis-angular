import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHealthProfileMenstrualHistoryComponent } from './pd-health-profile-menstrual-history.component';

describe('PdHealthProfileMenstrualHistoryComponent', () => {
  let component: PdHealthProfileMenstrualHistoryComponent;
  let fixture: ComponentFixture<PdHealthProfileMenstrualHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdHealthProfileMenstrualHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHealthProfileMenstrualHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
