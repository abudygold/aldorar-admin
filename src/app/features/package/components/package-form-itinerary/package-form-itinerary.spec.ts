import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormItinerary } from './package-form-itinerary';

describe('PackageFormItinerary', () => {
  let component: PackageFormItinerary;
  let fixture: ComponentFixture<PackageFormItinerary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormItinerary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormItinerary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
