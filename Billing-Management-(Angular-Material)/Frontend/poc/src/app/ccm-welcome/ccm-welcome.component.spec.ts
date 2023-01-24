import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcmWelcomeComponent } from './ccm-welcome.component';

describe('CcmWelcomeComponent', () => {
  let component: CcmWelcomeComponent;
  let fixture: ComponentFixture<CcmWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcmWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcmWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
