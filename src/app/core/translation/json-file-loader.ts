import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { ID_TRANSLATION } from '../../../i18n/id';

@Injectable()
export class JsonFileLoader implements TranslateLoader {
	private translations: { [key: string]: any } = {
		id: ID_TRANSLATION,
		// en: EN_TRANSLATION,
		// ar: AR_TRANSLATION,
	};

	getTranslation(lang: string): Observable<any> {
		// Return the imported translations for the requested language
		const translation = this.translations[lang];

		if (translation) {
			return of(translation);
		}

		// Fallback to empty object if language not found
		return of({});
	}
}
