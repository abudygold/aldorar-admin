import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePriceForm } from './package-price-form';

describe('PackagePriceForm', () => {
  let component: PackagePriceForm;
  let fixture: ComponentFixture<PackagePriceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagePriceForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePriceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
