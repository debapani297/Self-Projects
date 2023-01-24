import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveOrganisationsComponent } from './inactive-organisations.component';

describe('InactiveOrganisationsComponent', () => {
  let component: InactiveOrganisationsComponent;
  let fixture: ComponentFixture<InactiveOrganisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveOrganisationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
