import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const token = inject(Auth).accessToken;

	if (!token) return next(req);

	// Clone the request to add the authentication header.
	const authReq = req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
		},
	});

	return next(authReq);
};
