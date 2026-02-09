import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTransactionAdd } from './package-transaction-add';

describe('PackageTransactionAdd', () => {
  let component: PackageTransactionAdd;
  let fixture: ComponentFixture<PackageTransactionAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageTransactionAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageTransactionAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
