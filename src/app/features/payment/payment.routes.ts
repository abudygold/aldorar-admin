import { Routes } from '@angular/router';
import { PAYMENT_LIST_BREADCRUMB, PAYMENT_LIST_TITLE } from '../../shared/constant/global';

export const PAYMENT_ROUTES: Routes = [
	{
		path: 'payment',
		children: [
			{
				path: '',
				loadComponent: () => import('./page/payment-list').then((m) => m.PaymentList),
				data: {
					title: PAYMENT_LIST_TITLE,
					breadcrumb: PAYMENT_LIST_BREADCRUMB,
				},
			},
			/* {
				path: 'add',
				loadComponent: () => import('./page/package-form').then((m) => m.PackageForm),
				data: {
					title: PACKAGE_ADD_TITLE,
					breadcrumb: PACKAGE_ADD_BREADCRUMB,
				},
			},
			{
				path: 'edit/:id',
				loadComponent: () => import('./page/package-form').then((m) => m.PackageForm),
				data: {
					title: PACKAGE_EDIT_TITLE,
					breadcrumb: PACKAGE_EDIT_BREADCRUMB,
				},
			}, */
		],
	},
];
