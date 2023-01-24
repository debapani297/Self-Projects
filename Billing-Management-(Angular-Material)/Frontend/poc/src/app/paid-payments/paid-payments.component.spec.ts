import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPaymentsComponent } from './paid-payments.component';

describe('PaidPaymentsComponent', () => {
  let component: PaidPaymentsComponent;
  let fixture: ComponentFixture<PaidPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
