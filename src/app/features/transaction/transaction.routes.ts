import { Routes } from '@angular/router';
import {
	TRANSACTION_ADD_BREADCRUMB,
	TRANSACTION_ADD_TITLE,
	TRANSACTION_EDIT_BREADCRUMB,
	TRANSACTION_EDIT_TITLE,
	TRANSACTION_LIST_BREADCRUMB,
	TRANSACTION_LIST_TITLE,
} from '../../shared/constant/global';

export const TRANSACTION_ROUTES: Routes = [
	{
		path: 'transaction',
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./page/transaction-list').then((m) => m.TransactionList),
				data: {
					title: TRANSACTION_LIST_TITLE,
					breadcrumb: TRANSACTION_LIST_BREADCRUMB,
				},
			},
			{
				path: 'add',
				loadComponent: () =>
					import('./page/transaction-form').then((m) => m.TransactionForm),
				data: {
					title: TRANSACTION_ADD_TITLE,
					breadcrumb: TRANSACTION_ADD_BREADCRUMB,
				},
			},
			{
				path: 'edit/:id',
				loadComponent: () =>
					import('./page/transaction-form').then((m) => m.TransactionForm),
				data: {
					title: TRANSACTION_EDIT_TITLE,
					breadcrumb: TRANSACTION_EDIT_BREADCRUMB,
				},
			},
		],
	},
];
