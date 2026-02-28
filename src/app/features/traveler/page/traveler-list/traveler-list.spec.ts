import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerList } from './traveler-list';

describe('TravelerList', () => {
  let component: TravelerList;
  let fixture: ComponentFixture<TravelerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
