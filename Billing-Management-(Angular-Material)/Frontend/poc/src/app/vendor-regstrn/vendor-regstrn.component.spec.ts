import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorRegstrnComponent } from './vendor-regstrn.component';

describe('VendorRegstrnComponent', () => {
  let component: VendorRegstrnComponent;
  let fixture: ComponentFixture<VendorRegstrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorRegstrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorRegstrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
