import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingContractListComponent } from './pending-contract-list.component';

describe('PendingContractListComponent', () => {
  let component: PendingContractListComponent;
  let fixture: ComponentFixture<PendingContractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingContractListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
