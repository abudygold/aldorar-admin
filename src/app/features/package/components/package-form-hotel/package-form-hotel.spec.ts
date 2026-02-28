import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormHotel } from './package-form-hotel';

describe('PackageFormHotel', () => {
  let component: PackageFormHotel;
  let fixture: ComponentFixture<PackageFormHotel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormHotel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormHotel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
