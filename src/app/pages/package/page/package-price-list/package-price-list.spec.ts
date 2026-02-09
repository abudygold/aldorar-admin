import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePriceList } from './package-price-list';

describe('PackagePriceList', () => {
  let component: PackagePriceList;
  let fixture: ComponentFixture<PackagePriceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagePriceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePriceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
