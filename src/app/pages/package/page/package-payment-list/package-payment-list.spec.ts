import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePaymentList } from './package-payment-list';

describe('PackagePaymentList', () => {
  let component: PackagePaymentList;
  let fixture: ComponentFixture<PackagePaymentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagePaymentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagePaymentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
