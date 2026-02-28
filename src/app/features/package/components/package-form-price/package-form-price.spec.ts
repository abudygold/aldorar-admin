import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormPrice } from './package-form-price';

describe('PackageFormPrice', () => {
  let component: PackageFormPrice;
  let fixture: ComponentFixture<PackageFormPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormPrice);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
