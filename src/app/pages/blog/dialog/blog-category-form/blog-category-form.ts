import { Component, inject, signal } from '@angular/core';
import { form, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog, Formly, FormlyFormConfig } from '@devkitify/angular-ui-kit';
import { BaseAlert, DEFAULT_MESSAGE_CREATE, DEFAULT_MESSAGE_UPDATE } from '../../../../core/common';
import { API } from '../../../../core/services';
import { CATEGORIES_URL } from '../../../../shared/config';
import { BLOG_CATEGORY_FORM, IBlogCategory } from '../../../../shared/forms';
import { IHttpResponse } from '../../../../shared/interface/base/http-response';

@Component({
	selector: 'app-blog-category-form',
	imports: [Formly, Dialog, MatButtonModule],
	templateUrl: './blog-category-form.html',
	styleUrl: './blog-category-form.css',
})
export class BlogCategoryForm {
	protected dialogRef = inject(MatDialogRef<BlogCategoryForm>);
	protected data = inject(MAT_DIALOG_DATA);
	#api = inject(API);

	formModel = signal<IBlogCategory>({
		label: this.data?.label || '',
		value: this.data?.value || '',
		code: this.data?.code || '',
	});

	formData = form(this.formModel, (schemaPath) => {
		required(schemaPath.label, { message: 'Label is required' });
		required(schemaPath.value, { message: 'Value is required' });
		required(schemaPath.code, { message: 'Code is required' });
	});

	formConfig: FormlyFormConfig = BLOG_CATEGORY_FORM(this.formData);

	onSubmit(): void {
		submit(this.formData, async () => this.categoryService());
	}

	categoryService(): void {
		const URI = `${CATEGORIES_URL}${this.data ? `/${this.data?.id}` : ''}`;

		this.#api[this.data ? 'put' : 'post']<IHttpResponse>(URI, this.formModel()).subscribe({
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
