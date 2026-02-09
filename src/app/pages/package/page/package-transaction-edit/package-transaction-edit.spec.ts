import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTransactionEdit } from './package-transaction-edit';

describe('PackageTransactionEdit', () => {
  let component: PackageTransactionEdit;
  let fixture: ComponentFixture<PackageTransactionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageTransactionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageTransactionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
