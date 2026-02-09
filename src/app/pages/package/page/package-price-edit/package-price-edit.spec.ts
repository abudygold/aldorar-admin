import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePriceEdit } from './package-price-edit';

describe('PackagePriceEdit', () => {
  let component: PackagePriceEdit;
  let fixture: ComponentFixture<PackagePriceEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagePriceEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePriceEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
