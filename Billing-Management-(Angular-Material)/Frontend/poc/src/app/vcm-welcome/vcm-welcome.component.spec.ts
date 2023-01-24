import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcmWelcomeComponent } from './vcm-welcome.component';

describe('VcmWelcomeComponent', () => {
  let component: VcmWelcomeComponent;
  let fixture: ComponentFixture<VcmWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcmWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcmWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
