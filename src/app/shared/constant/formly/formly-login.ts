import { FieldTree } from '@angular/forms/signals';
import { FormlyField, FormlyFormConfig } from '@devkitify/angular-ui-kit';

export interface ILoginForm {
	email: string;
	password: string;
}

export const FORMLY_LOGIN_FORM = (
	formData: FieldTree<ILoginForm, string | number>,
): FormlyFormConfig => ({
	formClass: 'tw:grid tw:gap-4',
	fields: [
		{
			key: 'email',
			type: 'textbox',
			control: formData.email,
			config: { label: 'E-Mail', required: true, textboxType: 'email' },
		},
		{
			key: 'password',
			type: 'textbox',
			control: formData.password,
			config: { label: 'Password', textboxType: 'password' },
		},
	] as FormlyField[],
});
