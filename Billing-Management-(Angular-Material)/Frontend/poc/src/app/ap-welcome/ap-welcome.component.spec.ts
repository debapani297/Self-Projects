import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApWelcomeComponent } from './ap-welcome.component';

describe('ApWelcomeComponent', () => {
  let component: ApWelcomeComponent;
  let fixture: ComponentFixture<ApWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
