import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArWelcomeComponent } from './ar-welcome.component';

describe('ArWelcomeComponent', () => {
  let component: ArWelcomeComponent;
  let fixture: ComponentFixture<ArWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
