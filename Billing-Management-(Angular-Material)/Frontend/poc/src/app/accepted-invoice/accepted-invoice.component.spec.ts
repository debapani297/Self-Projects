import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedInvoiceComponent } from './accepted-invoice.component';

describe('AcceptedInvoiceComponent', () => {
  let component: AcceptedInvoiceComponent;
  let fixture: ComponentFixture<AcceptedInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
