import { Routes } from '@angular/router';
import {
	PACKAGE_ADD_BREADCRUMB,
	PACKAGE_ADD_TITLE,
	PACKAGE_EDIT_BREADCRUMB,
	PACKAGE_EDIT_TITLE,
	PACKAGE_LIST_BREADCRUMB,
	PACKAGE_LIST_TITLE,
} from '../../shared/constant/global';

export const PACKAGE_ROUTES: Routes = [
	{
		path: 'package',
		children: [
			{
				path: '',
				loadComponent: () => import('./page/package-list').then((m) => m.PackageList),
				data: {
					title: PACKAGE_LIST_TITLE,
					breadcrumb: PACKAGE_LIST_BREADCRUMB,
				},
			},
			{
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
			},
		],
	},
];
