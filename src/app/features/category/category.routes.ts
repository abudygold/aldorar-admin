import { Routes } from '@angular/router';
import { CATEGORY_BREADCRUMB, CATEGORY_LIST_TITLE } from '../../shared/constant/global';

export const CATEGORY_ROUTES: Routes = [
	{
		path: 'categories',
		children: [
			{
				path: '',
				loadComponent: () => import('./page/category-list').then((m) => m.CategoryList),
				data: {
					title: CATEGORY_LIST_TITLE,
					breadcrumb: CATEGORY_BREADCRUMB,
				},
			},
		],
	},
];
