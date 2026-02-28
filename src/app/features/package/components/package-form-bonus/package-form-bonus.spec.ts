import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormBonus } from './package-form-bonus';

describe('PackageFormBonus', () => {
  let component: PackageFormBonus;
  let fixture: ComponentFixture<PackageFormBonus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormBonus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormBonus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
