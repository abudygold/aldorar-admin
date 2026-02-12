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
import { API } from '../services';

export class BaseForm<FormModel> {
	api = inject(API);
	route = inject(Router);
	activatedRoute = inject(ActivatedRoute);

	formModel!: WritableSignal<FormModel>;
	formData!: FieldTree<FormModel, string | number>;
	fnSubmit!: VoidFunction;

	constructor(
		formModel: FormModel,
		formData: FormOptions | SchemaOrSchemaFn<FormModel, PathKind.Root>,
	) {
		this.formModel = signal<FormModel>(formModel);
		this.formData = form(this.formModel, formData);
	}

	onSubmit(): void {
		submit(this.formData, async () => this.fnSubmit());
	}
}
