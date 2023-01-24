import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedContractListComponent } from './approved-contract-list-component.component';

describe('ApprovedContractListComponent', () => {
  let component: ApprovedContractListComponent;
  let fixture: ComponentFixture<ApprovedContractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedContractListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
