import { FieldTree } from '@angular/forms/signals';
import { FormlyField, FormlyFormConfig } from '@devkitify/angular-ui-kit';

export interface IBlogCategory {
	label: string;
	value: string;
	code: string;
}

export const BLOG_CATEGORY_FORM = (
	formData: FieldTree<IBlogCategory, string | number>,
): FormlyFormConfig => ({
	formClass: 'tw:grid tw:gap-4',
	fields: [
		{
			key: 'label',
			type: 'textbox',
			control: formData.label,
			config: { label: 'Label', required: true },
		},
		{
			key: 'value',
			type: 'textbox',
			control: formData.value,
			config: { label: 'Value', required: true },
		},
		{
			key: 'code',
			type: 'textbox',
			control: formData.code,
			config: { label: 'Code', required: true },
		},
	] as FormlyField[],
});
