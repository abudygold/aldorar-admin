import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormFlight } from './package-form-flight';

describe('PackageFormFlight', () => {
  let component: PackageFormFlight;
  let fixture: ComponentFixture<PackageFormFlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormFlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormFlight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
