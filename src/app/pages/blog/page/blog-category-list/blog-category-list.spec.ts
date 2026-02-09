import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryList } from './blog-category-list';

describe('BlogCategoryList', () => {
  let component: BlogCategoryList;
  let fixture: ComponentFixture<BlogCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCategoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCategoryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
