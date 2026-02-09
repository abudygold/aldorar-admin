import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);

	return next(req).pipe(
		catchError((error) => {
			if (error.status === 401) {
				// Unauthorized
				router.navigate(['/auth']);
			}

			if (error.status === 403) {
				// Forbidden
				console.error('Access denied');
			}

			if (error.status >= 500) {
				console.error('Server error', error);
			}

			return throwError(() => error);
		}),
	);
};
