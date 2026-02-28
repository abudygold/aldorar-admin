import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog, Formly, FormlyFormConfig } from '@devkitify/angular-ui-kit';
import { BaseForm } from '../../../../core/common';
import {
	DEFAULT_STATE_CATEGORY,
	IBlogCategoryReq,
	INIT_FORM_CATEGORY,
	SCHEMA_FORM_CATEGORY,
} from '../../../../shared/constant/formly';
import { CATEGORIES_URL } from '../../../../shared/constant/global';

@Component({
	selector: 'app-category-form',
	imports: [Formly, Dialog, MatButtonModule],
	templateUrl: './category-form.html',
	styleUrl: './category-form.css',
})
export class CategoryForm extends BaseForm<IBlogCategoryReq> {
	protected dialogRef = inject(MatDialogRef<CategoryForm>);
	protected data = inject(MAT_DIALOG_DATA);

	formConfig!: WritableSignal<FormlyFormConfig>;

	constructor() {
		super({} as IBlogCategoryReq, (schemaPath) => SCHEMA_FORM_CATEGORY(schemaPath));

		this.id.set(this.data?.id || null);
		this.formModel.set(DEFAULT_STATE_CATEGORY(this.data));
		this.formConfig = signal(INIT_FORM_CATEGORY(this.formData));
	}

	handleSubmit(): void {
		this.sendToApi(CATEGORIES_URL, this.formModel(), {}, () => this.dialogRef.close(true));
	}
}
