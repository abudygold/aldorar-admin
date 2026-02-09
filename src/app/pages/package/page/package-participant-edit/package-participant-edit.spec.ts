import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageParticipantEdit } from './package-participant-edit';

describe('PackageParticipantEdit', () => {
  let component: PackageParticipantEdit;
  let fixture: ComponentFixture<PackageParticipantEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageParticipantEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageParticipantEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
