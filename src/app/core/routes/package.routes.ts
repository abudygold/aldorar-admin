import { Routes } from '@angular/router';
import {
	PACKAGE_ADD_BREADCRUMB,
	PACKAGE_ADD_TITLE,
	PACKAGE_EDIT_BREADCRUMB,
	PACKAGE_EDIT_TITLE,
	PACKAGE_LIST_BREADCRUMB,
	PACKAGE_LIST_TITLE,
	PACKAGE_PARTICIPANT_LIST_BREADCRUMB,
	PACKAGE_PARTICIPANT_LIST_TITLE,
	PACKAGE_PAYMENT_LIST_BREADCRUMB,
	PACKAGE_PAYMENT_LIST_TITLE,
	PACKAGE_PRICE_LIST_BREADCRUMB,
	PACKAGE_PRICE_LIST_TITLE,
	PACKAGE_TRANSACTION_LIST_BREADCRUMB,
	PACKAGE_TRANSACTION_LIST_TITLE,
} from '../../shared/config';

export const PACKAGE_ROUTES: Routes = [
	{
		path: 'package',
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../../pages/package/page/package-list').then((m) => m.PackageList),
				data: {
					title: PACKAGE_LIST_TITLE,
					breadcrumb: PACKAGE_LIST_BREADCRUMB,
				},
			},
			{
				path: 'add',
				loadComponent: () =>
					import('../../pages/package/page/package-form').then((m) => m.PackageForm),
				data: {
					title: PACKAGE_ADD_TITLE,
					breadcrumb: PACKAGE_ADD_BREADCRUMB,
				},
			},
			{
				path: 'edit/:id',
				loadComponent: () =>
					import('../../pages/package/page/package-form').then((m) => m.PackageForm),
				data: {
					title: PACKAGE_EDIT_TITLE,
					breadcrumb: PACKAGE_EDIT_BREADCRUMB,
				},
			},
			{
				path: 'price',
				children: [
					{
						path: '',
						loadComponent: () =>
							import('../../pages/package/page/package-price-list').then(
								(m) => m.PackagePriceList,
							),
						data: {
							title: PACKAGE_PRICE_LIST_TITLE,
							breadcrumb: PACKAGE_PRICE_LIST_BREADCRUMB,
						},
					},
				],
			},
			{
				path: 'transaction',
				children: [
					{
						path: '',
						loadComponent: () =>
							import('../../pages/package/page/package-transaction-list').then(
								(m) => m.PackageTransactionList,
							),
						data: {
							title: PACKAGE_TRANSACTION_LIST_TITLE,
							breadcrumb: PACKAGE_TRANSACTION_LIST_BREADCRUMB,
						},
					},
				],
			},
			{
				path: 'participant',
				children: [
					{
						path: '',
						loadComponent: () =>
							import('../../pages/package/page/package-participant-list').then(
								(m) => m.PackageParticipantList,
							),
						data: {
							title: PACKAGE_PARTICIPANT_LIST_TITLE,
							breadcrumb: PACKAGE_PARTICIPANT_LIST_BREADCRUMB,
						},
					},
				],
			},
			{
				path: 'payment',
				children: [
					{
						path: '',
						loadComponent: () =>
							import('../../pages/package/page/package-payment-list').then(
								(m) => m.PackagePaymentList,
							),
						data: {
							title: PACKAGE_PAYMENT_LIST_TITLE,
							breadcrumb: PACKAGE_PAYMENT_LIST_BREADCRUMB,
						},
					},
				],
			},
		],
	},
];
