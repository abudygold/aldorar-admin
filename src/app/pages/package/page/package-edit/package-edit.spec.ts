import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageEdit } from './package-edit';

describe('PackageEdit', () => {
  let component: PackageEdit;
  let fixture: ComponentFixture<PackageEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
