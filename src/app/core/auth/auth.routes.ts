import { Routes } from '@angular/router';
import { GuestGuard } from './guards';

export const AUTH_ROUTES: Routes = [
	{
		path: 'auth',
		canActivate: [GuestGuard],
		loadComponent: () => import('./page/login').then((m) => m.Login),
	},
];
