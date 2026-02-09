import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageParticipantForm } from './package-participant-form';

describe('PackageParticipantForm', () => {
  let component: PackageParticipantForm;
  let fixture: ComponentFixture<PackageParticipantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageParticipantForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageParticipantForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
