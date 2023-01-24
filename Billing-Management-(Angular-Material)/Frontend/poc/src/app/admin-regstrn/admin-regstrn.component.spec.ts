import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegstrnComponent } from './admin-regstrn.component';

describe('AdminRegstrnComponent', () => {
  let component: AdminRegstrnComponent;
  let fixture: ComponentFixture<AdminRegstrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegstrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegstrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
