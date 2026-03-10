import { HttpParams } from '@angular/common/http';
import { inject, signal, WritableSignal } from '@angular/core';
import {
	FieldTree,
	form,
	FormOptions,
	PathKind,
	SchemaOrSchemaFn,
	submit,
} from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { IHttpResponse } from '../../shared/interface/base';
import { API } from '../services';
import { BaseAlert, DEFAULT_MESSAGE_CREATE, DEFAULT_MESSAGE_UPDATE } from './base-sweetalert';

export class BaseForm<FormModel> {
	api = inject(API);
	route = inject(Router);
	activatedRoute = inject(ActivatedRoute);

	formModel!: WritableSignal<FormModel>;
	formData!: FieldTree<FormModel, string | number>;

	id = signal<any>(null);
	isPageLoaded = signal<boolean>(false);

	constructor(
		formModel: FormModel,
		formData: FormOptions | SchemaOrSchemaFn<FormModel, PathKind.Root>,
	) {
		this.formModel = signal<FormModel>(formModel);
		this.formData = form(this.formModel, formData);

		this.id.set(this.activatedRoute.snapshot.paramMap.get('id') || null);
	}

	changeFormData(formData: FormOptions | SchemaOrSchemaFn<FormModel, PathKind.Root>): void {
		this.formData = form(this.formModel, formData);
	}

	getDetailService(
		URL: string,
		EDIT_STATE: any,
		callbackFn?: (res: IHttpResponse) => void,
	): void {
		this.api.get<IHttpResponse>(`${URL}/${this.id()}`).subscribe({
			next: (res) => {
				this.formModel.update((form) => ({
					...form,
					...EDIT_STATE(res?.data),
				}));

				if (callbackFn) callbackFn(res);
			},
		});
	}

	sendToApi(
		URL: string,
		bodyReq: any = null,
		params?: object,
		callbackFn?: VoidFunction,
		errorFn?: VoidFunction,
	): void {
		submit(this.formData, async () =>
			this.#onSubmitService(URL, bodyReq, params, callbackFn, errorFn),
		);
	}

	#onSubmitService(
		URL: string,
		bodyReq: any = null,
		params?: any,
		callbackFn?: VoidFunction,
		errorFn?: VoidFunction,
	): void {
		const URI = `${URL}${this.id() ? `/${this.id()}` : ''}${
			params
				? `?${new HttpParams({
						fromObject: params,
					})}`
				: ''
		}`;

		this.api[this.id() ? 'put' : 'post']<IHttpResponse>(URI, bodyReq).subscribe({
			next: (res) => {
				BaseAlert(
					'Success!',
					res?.msg || (this.id() ? DEFAULT_MESSAGE_CREATE : DEFAULT_MESSAGE_UPDATE),
					'success',
				);

				if (callbackFn) callbackFn();
			},
			error: (err) => {
				if (errorFn) errorFn();
			},
		});
	}
}
