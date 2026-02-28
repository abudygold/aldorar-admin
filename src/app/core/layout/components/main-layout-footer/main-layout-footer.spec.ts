import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutFooter } from './main-layout-footer';

describe('MainLayoutFooter', () => {
  let component: MainLayoutFooter;
  let fixture: ComponentFixture<MainLayoutFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
