import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdPersonalProfileComponent } from './pd-personal-profile.component';

describe('PdPersonalProfileComponent', () => {
  let component: PdPersonalProfileComponent;
  let fixture: ComponentFixture<PdPersonalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdPersonalProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdPersonalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
