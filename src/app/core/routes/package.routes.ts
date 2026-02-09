import { Routes } from '@angular/router';

export const PACKAGE_ROUTES: Routes = [
	{
		path: 'package',
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../../pages/package/page/package-list').then((m) => m.PackageList),
			},
			{
				path: 'add',
				loadComponent: () =>
					import('../../pages/package/page/package-add').then((m) => m.PackageAdd),
			},
			{
				path: 'edit/:id',
				loadComponent: () =>
					import('../../pages/package/page/package-edit').then((m) => m.PackageEdit),
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
					},
				],
			},
		],
	},
];
