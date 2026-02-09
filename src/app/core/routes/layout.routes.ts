import { Routes } from '@angular/router';
import { DASHBOARD_BREADCRUMB, DASHBOARD_TITLE } from '../../shared/config';
import { authGuard } from '../guard';
import { BLOG_ROUTES } from './blog.routes';
import { PACKAGE_ROUTES } from './package.routes';

export const LAYOUT_ROUTES: Routes = [
	{
		path: 'secure',
		canActivate: [authGuard],
		loadComponent: () =>
			import('../../core/layout/page/admin-layout').then((m) => m.AdminLayout),
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../../pages/dashboard/page/dashboard').then((m) => m.Dashboard),
				data: {
					title: DASHBOARD_TITLE,
					breadcrumb: DASHBOARD_BREADCRUMB,
				},
			},
			...BLOG_ROUTES,
			...PACKAGE_ROUTES,
		],
	},
];
