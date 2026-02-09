import { Routes } from '@angular/router';
import {
	BLOG_ADD_BREADCRUMB,
	BLOG_CATEGORY_BREADCRUMB,
	BLOG_CATEGORY_TITLE,
	BLOG_EDIT_BREADCRUMB,
	BLOG_LIST_BREADCRUMB,
	BLOG_TITLE,
} from '../../shared/config';

export const BLOG_ROUTES: Routes = [
	{
		path: 'blog',
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../../pages/blog/page/blog-list').then((m) => m.BlogList),
				data: {
					title: BLOG_TITLE,
					breadcrumb: BLOG_LIST_BREADCRUMB,
				},
			},
			{
				path: 'add',
				loadComponent: () =>
					import('../../pages/blog/page/blog-form').then((m) => m.BlogForm),
				data: {
					title: BLOG_TITLE,
					breadcrumb: BLOG_ADD_BREADCRUMB,
				},
			},
			{
				path: 'edit/:id',
				loadComponent: () =>
					import('../../pages/blog/page/blog-form').then((m) => m.BlogForm),
				data: {
					title: BLOG_TITLE,
					breadcrumb: BLOG_EDIT_BREADCRUMB,
				},
			},
			{
				path: 'categories',
				children: [
					{
						path: '',
						loadComponent: () =>
							import('../../pages/blog/page/blog-category-list').then(
								(m) => m.BlogCategoryList,
							),
						data: {
							title: BLOG_CATEGORY_TITLE,
							breadcrumb: BLOG_CATEGORY_BREADCRUMB,
						},
					},
				],
			},
		],
	},
];
