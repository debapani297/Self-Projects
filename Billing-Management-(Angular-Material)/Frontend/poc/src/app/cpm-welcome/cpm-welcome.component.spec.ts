import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmWelcomeComponent } from './cpm-welcome.component';

describe('CpmWelcomeComponent', () => {
  let component: CpmWelcomeComponent;
  let fixture: ComponentFixture<CpmWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpmWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
