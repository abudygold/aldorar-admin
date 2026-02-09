import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	template: `<router-outlet />`,
})
export class App {
	#translate = inject(TranslateService);

	constructor() {
		const language = localStorage?.getItem('aldorar.language') ?? 'id';

		this.#translate.setFallbackLang(language);
		this.#translate.use(language);
	}
}
