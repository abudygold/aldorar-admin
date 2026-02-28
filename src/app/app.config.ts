import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { routes } from './app.routes';
import { authInterceptor, errorInterceptor } from './core/interceptors';
import { JsonFileLoader } from './core/translation';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(
			routes,
			withInMemoryScrolling({
				scrollPositionRestoration: 'top',
				anchorScrolling: 'enabled',
			}),
		),
		provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
		provideTranslateService({
			loader: provideTranslateLoader(JsonFileLoader),
			fallbackLang: 'id',
			lang: 'id',
		}),
		provideSweetAlert2({
			fireOnInit: false,
			dismissOnDestroy: true,
		}),
		{ provide: MAT_DATE_LOCALE, useValue: 'id-ID' },
		provideNativeDateAdapter({
			parse: {
				dateInput: 'DD/MM/YYYY',
				timeInput: 'HH:mm',
			},
			display: {
				dateInput: 'DD/MM/YYYY',
				monthLabel: 'MMM',
				monthYearLabel: 'MMMM YYYY',
				dateA11yLabel: 'LL',
				monthYearA11yLabel: 'MMMM YYYY',
				timeInput: 'HH:mm',
				timeOptionLabel: 'HH:mm',
			},
		}),
	],
};
