import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog, Formly, FormlyFormConfig } from '@devkitify/angular-ui-kit';
import {
	BaseAlert,
	BaseForm,
	DEFAULT_MESSAGE_CREATE,
	DEFAULT_MESSAGE_UPDATE,
} from '../../../../core/common';
import { CATEGORIES_URL } from '../../../../shared/config';
import {
	DEFAULT_STATE_BLOG_CATEGORY,
	FORM_BLOG_CATEGORY,
	FORM_SCHEMA_BLOG_CATEGORY,
	IBlogCategory,
} from '../../../../shared/forms';
import { IHttpResponse } from '../../../../shared/interface/base';

@Component({
	selector: 'app-blog-category-form',
	imports: [Formly, Dialog, MatButtonModule],
	templateUrl: './blog-category-form.html',
	styleUrl: './blog-category-form.css',
})
export class BlogCategoryForm extends BaseForm<IBlogCategory> {
	protected dialogRef = inject(MatDialogRef<BlogCategoryForm>);
	protected data = inject(MAT_DIALOG_DATA);

	formConfig = signal<FormlyFormConfig>(FORM_BLOG_CATEGORY(this.formData));

	constructor() {
		super({} as IBlogCategory, (schemaPath) => FORM_SCHEMA_BLOG_CATEGORY(schemaPath));
		this.formModel.set(DEFAULT_STATE_BLOG_CATEGORY(this.data));
		this.fnSubmit = this.onSubmitService;
	}

	onSubmitService(): void {
		const URI = `${CATEGORIES_URL}${this.data ? `/${this.data?.id}` : ''}`;

		this.api[this.data ? 'put' : 'post']<IHttpResponse>(URI, this.formModel()).subscribe({
			next: (res) => {
				BaseAlert(
					'Success!',
					res?.msg || (this.data ? DEFAULT_MESSAGE_CREATE : DEFAULT_MESSAGE_UPDATE),
					'success',
				);
				this.dialogRef.close(true);
			},
		});
	}
}
