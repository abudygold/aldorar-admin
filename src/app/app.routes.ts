import { Routes } from '@angular/router';
import { AUTH_ROUTES, LAYOUT_ROUTES } from './core/routes';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	...AUTH_ROUTES,
	...LAYOUT_ROUTES,
];
