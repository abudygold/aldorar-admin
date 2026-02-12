import { FieldTree, PathKind, required, SchemaPathTree } from '@angular/forms/signals';
import { FormlyField, FormlyFormConfig } from '@devkitify/angular-ui-kit';

export interface IBlogCategory {
	label: string;
	value: string;
	code: string;
}

export const DEFAULT_STATE_BLOG_CATEGORY = (data: any) => ({
	label: data?.label || '',
	value: data?.value || '',
	code: data?.code || '',
});

export const FORM_SCHEMA_BLOG_CATEGORY = (
	schemaPath: SchemaPathTree<IBlogCategory, PathKind.Root>,
) => {
	required(schemaPath.label, { message: 'Label is required' });
	required(schemaPath.value, { message: 'Value is required' });
	required(schemaPath.code, { message: 'Code is required' });
};

export const FORM_BLOG_CATEGORY = (
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
