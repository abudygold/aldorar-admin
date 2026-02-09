import { Component, inject, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { Formly, FormlyFormConfig } from '@devkitify/angular-ui-kit';
import { LOGIN_URL } from '../../../../shared/config';
import { AUTH_LOGIN_FORM, ILogin } from '../../../../shared/forms';
import { API, Auth } from '../../../services';

@Component({
	selector: 'app-auth-login',
	imports: [MatButtonModule, MatDividerModule, Formly],
	templateUrl: './auth-login.html',
	styleUrl: './auth-login.css',
})
export class AuthLogin {
	#router = inject(Router);
	#auth = inject(Auth);
	#api = inject(API);

	formModel = signal<ILogin>({
		email: '',
		password: '',
	});

	formData = form(this.formModel, (schemaPath) => {
		required(schemaPath.email, { message: 'Email is required' });
		email(schemaPath.email, { message: 'Enter a valid email address' });
		required(schemaPath.password, { message: 'Password is required' });
	});

	formConfig: FormlyFormConfig = AUTH_LOGIN_FORM(this.formData);

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
