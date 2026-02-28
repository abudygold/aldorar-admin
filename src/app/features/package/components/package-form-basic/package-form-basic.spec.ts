import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageFormBasic } from './package-form-basic';

describe('PackageFormBasic', () => {
  let component: PackageFormBasic;
  let fixture: ComponentFixture<PackageFormBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageFormBasic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageFormBasic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
