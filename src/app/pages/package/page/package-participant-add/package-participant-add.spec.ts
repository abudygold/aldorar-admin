import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageParticipantAdd } from './package-participant-add';

describe('PackageParticipantAdd', () => {
  let component: PackageParticipantAdd;
  let fixture: ComponentFixture<PackageParticipantAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageParticipantAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageParticipantAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
