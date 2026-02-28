import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BaseAlertHTML } from '../common';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const router = inject(Router);
	const dialog = inject(MatDialog);

	return next(req).pipe(
		catchError((error) => {
			if (error.status === 400) {
				let message = 'Terjadi kesalahan validasi';
				const errorMsg = error.error?.msg || '';
				const errorCode = error.error?.code || '';

				dialog.closeAll();

				if (errorMsg) {
					// Jika error berupa object dengan array message
					if (typeof errorMsg === 'object') {
						const firstKey = Object.keys(errorMsg)[0];
						const value = errorMsg[firstKey];

						if (Array.isArray(value)) {
							message = value.join('<br>');
						} else if (typeof value === 'string') {
							message = value;
						}
					}

					// Jika backend kirim string langsung
					if (typeof errorMsg === 'string') {
						message = errorMsg;
					}
				}

				BaseAlertHTML(errorCode, message, 'error');
			}

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
