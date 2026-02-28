import { Routes } from '@angular/router';
import { BLOG_ROUTES } from '../../features/blog/blog.routes';
import { CATEGORY_ROUTES } from '../../features/category/category.routes';
import { PACKAGE_ROUTES } from '../../features/package/package.routes';
import { PAYMENT_ROUTES } from '../../features/payment/payment.routes';
import { TRANSACTION_ROUTES } from '../../features/transaction/transaction.routes';
import { TRAVELER_ROUTES } from '../../features/traveler/traveler.routes';
import { DASHBOARD_BREADCRUMB, DASHBOARD_TITLE } from '../../shared/constant/global';
import { AuthGuard } from '../auth/guards';

export const LAYOUT_ROUTES: Routes = [
	{
		path: 'secure',
		canActivate: [AuthGuard],
		loadComponent: () => import('./page/main-layout').then((m) => m.MainLayout),
		children: [
			{
				path: '',
				loadComponent: () => import('../../features/dashboard').then((m) => m.Dashboard),
				data: {
					title: DASHBOARD_TITLE,
					breadcrumb: DASHBOARD_BREADCRUMB,
				},
			},
			...BLOG_ROUTES,
			...CATEGORY_ROUTES,
			...PACKAGE_ROUTES,
			...TRAVELER_ROUTES,
			...PAYMENT_ROUTES,
			...TRANSACTION_ROUTES,
		],
	},
];
