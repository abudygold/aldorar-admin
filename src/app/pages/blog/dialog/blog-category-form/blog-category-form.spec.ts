import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryForm } from './blog-category-form';

describe('BlogCategoryForm', () => {
  let component: BlogCategoryForm;
  let fixture: ComponentFixture<BlogCategoryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCategoryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCategoryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
