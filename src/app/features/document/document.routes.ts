import { Routes } from '@angular/router';
import {
	DOCUMENT_EDIT_BREADCRUMB,
	DOCUMENT_EDIT_TITLE,
	DOCUMENT_LIST_BREADCRUMB,
	DOCUMENT_LIST_TITLE,
} from '../../shared/constant/global';

export const DOCUMENT_ROUTES: Routes = [
	{
		path: 'document',
		children: [
			{
				path: '',
				loadComponent: () => import('./page/document-list').then((m) => m.DocumentList),
				data: {
					title: DOCUMENT_LIST_TITLE,
					breadcrumb: DOCUMENT_LIST_BREADCRUMB,
				},
			},
			{
				path: 'edit/:id',
				loadComponent: () => import('./page/document-form').then((m) => m.DocumentForm),
				data: {
					title: DOCUMENT_EDIT_TITLE,
					breadcrumb: DOCUMENT_EDIT_BREADCRUMB,
				},
			},
		],
	},
];
