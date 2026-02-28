import { Routes } from '@angular/router';
import {
	TRAVELER_ADD_BREADCRUMB,
	TRAVELER_ADD_TITLE,
	TRAVELER_EDIT_BREADCRUMB,
	TRAVELER_EDIT_TITLE,
	TRAVELER_LIST_BREADCRUMB,
	TRAVELER_LIST_TITLE,
} from '../../shared/constant/global';

export const TRAVELER_ROUTES: Routes = [
	{
		path: 'traveler',
		children: [
			{
				path: '',
				loadComponent: () => import('./page/traveler-list').then((m) => m.TravelerList),
				data: {
					title: TRAVELER_LIST_TITLE,
					breadcrumb: TRAVELER_LIST_BREADCRUMB,
				},
			},
			{
				path: 'add',
				loadComponent: () => import('./page/traveler-form').then((m) => m.TravelerForm),
				data: {
					title: TRAVELER_ADD_TITLE,
					breadcrumb: TRAVELER_ADD_BREADCRUMB,
				},
			},
			{
				path: 'edit/:id',
				loadComponent: () => import('./page/traveler-form').then((m) => m.TravelerForm),
				data: {
					title: TRAVELER_EDIT_TITLE,
					breadcrumb: TRAVELER_EDIT_BREADCRUMB,
				},
			},
		],
	},
];
