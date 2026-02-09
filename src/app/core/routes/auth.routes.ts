import { Routes } from '@angular/router';
import { guestGuard } from '../guard';

export const AUTH_ROUTES: Routes = [
	{
		path: 'auth',
		canActivate: [guestGuard],
		loadComponent: () => import('../layout/page/auth-layout').then((m) => m.AuthLayout),
		children: [
			{
				path: '',
				loadComponent: () =>
					import('../../core/layout/component/auth-login').then((m) => m.AuthLogin),
			},
		],
	},
];
