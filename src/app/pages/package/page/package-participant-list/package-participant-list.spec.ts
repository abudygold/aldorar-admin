import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageParticipantList } from './package-participant-list';

describe('PackageParticipantList', () => {
  let component: PackageParticipantList;
  let fixture: ComponentFixture<PackageParticipantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageParticipantList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageParticipantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
