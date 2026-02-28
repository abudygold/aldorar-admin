import { Component, inject, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { Formly, FormlyFormConfig } from '@devkitify/angular-ui-kit';
import { FORMLY_LOGIN_FORM, ILoginForm } from '../../../../shared/constant/formly';
import { LOGIN_URL } from '../../../../shared/constant/global';
import { API, Auth } from '../../../services';

@Component({
	selector: 'app-login',
	imports: [MatButtonModule, MatDividerModule, Formly],
	templateUrl: './login.html',
	styleUrl: './login.css',
})
export class Login {
	#router = inject(Router);
	#auth = inject(Auth);
	#api = inject(API);

	formModel = signal<ILoginForm>({
		email: '',
		password: '',
	});

	formData = form(this.formModel, (schemaPath) => {
		required(schemaPath.email, { message: 'Email is required' });
		email(schemaPath.email, { message: 'Enter a valid email address' });
		required(schemaPath.password, { message: 'Password is required' });
	});

	formConfig: FormlyFormConfig = FORMLY_LOGIN_FORM(this.formData);

	doLogin(): void {
		submit(this.formData, async () => this.#loginService());
	}

	#loginService(): void {
		this.#api.post(LOGIN_URL, this.formModel()).subscribe({
			next: (response: any) => this.#auth.setTokens(response.data),
			complete: () => this.#router.navigate(['./secure']),
		});
	}
}
