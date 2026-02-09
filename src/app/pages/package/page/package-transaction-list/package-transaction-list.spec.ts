import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTransactionList } from './package-transaction-list';

describe('PackageTransactionList', () => {
  let component: PackageTransactionList;
  let fixture: ComponentFixture<PackageTransactionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageTransactionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageTransactionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
