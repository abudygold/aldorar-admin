import { Component, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	BaseAlert,
	BaseForm,
	DEFAULT_MESSAGE_CREATE,
	DEFAULT_MESSAGE_UPDATE,
} from '../../../../core/common';
import { PACKAGE_URL } from '../../../../shared/config';
import {
	FLIGHT_TYPE,
	FORM_SCHEMA_PACKAGE,
	IPackageForm,
	STATE_DEFAULT_PACKAGE,
	STATE_EDIT_PACKAGE,
	UMRAH_TYPE,
} from '../../../../shared/forms';
import { IHttpResponse, IOptionList } from '../../../../shared/interface/base';

@Component({
	selector: 'app-package-form',
	imports: [
		FormField,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatSlideToggleModule,
		FontAwesomeModule,
		MatButtonModule,
		MatDatepickerModule,
	],
	templateUrl: './package-form.html',
	styleUrl: './package-form.css',
})
export class PackageForm extends BaseForm<IPackageForm> {
	opt = {
		umrahType: signal<IOptionList[]>(UMRAH_TYPE),
		flightType: signal<IOptionList[]>(FLIGHT_TYPE),
	};

	constructor() {
		super(STATE_DEFAULT_PACKAGE, (schemaPath) => FORM_SCHEMA_PACKAGE(schemaPath));
		this.fnSubmit = this.onSubmitService;

		this.formModel.update((formModel) => ({
			...formModel,
			id: this.activatedRoute.snapshot.paramMap.get('id') || '',
		}));

		this.formModel().id && this.getDetailService();
	}

	getDetailService(): void {
		this.api
			.get<IHttpResponse>(`${PACKAGE_URL}/${this.activatedRoute.snapshot.params['id']}`)
			.subscribe({
				next: (res) => {
					this.formModel.update((form) => ({
						...form,
						...STATE_EDIT_PACKAGE(res?.data),
					}));
				},
			});
	}

	onSubmitService(): void {
		const bodyReq = { ...this.formModel() };
		const URI = `${PACKAGE_URL}${this.formModel().id ? `/${this.formModel().id}` : ''}`;

		delete bodyReq.id;

		this.api[this.formModel().id ? 'put' : 'post']<IHttpResponse>(URI, bodyReq).subscribe({
			next: (res) => {
				BaseAlert(
					'Success!',
					res?.msg ||
						(this.formModel().id ? DEFAULT_MESSAGE_CREATE : DEFAULT_MESSAGE_UPDATE),
					'success',
				);
				this.goBackToList();
			},
		});
	}

	goBackToList(): void {
		this.route.navigate(['/secure/package']);
	}
}
