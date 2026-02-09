import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePriceAdd } from './package-price-add';

describe('PackagePriceAdd', () => {
  let component: PackagePriceAdd;
  let fixture: ComponentFixture<PackagePriceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagePriceAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePriceAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
