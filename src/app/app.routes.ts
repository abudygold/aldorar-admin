import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './core/auth/auth.routes';
import { LAYOUT_ROUTES } from './core/layout/layout.routes';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	...AUTH_ROUTES,
	...LAYOUT_ROUTES,
];
