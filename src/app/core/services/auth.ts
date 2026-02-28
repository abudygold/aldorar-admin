import { Injectable } from '@angular/core';
import { ILoginResp } from '../../shared/interface/response';

@Injectable({
	providedIn: 'root',
})
export class Auth {
	get accessToken(): string {
		const accessToken = localStorage.getItem('aldorar.access_token') || '';
		return accessToken;
	}

	get refreshToken(): string | null {
		const accessToken = localStorage.getItem('aldorar.refresh_token') || '';
		return accessToken;
	}

	get isLoggedIn(): boolean {
		return !!this.accessToken;
	}

	setTokens(auth: ILoginResp) {
		if (!auth) return;

		localStorage.setItem('aldorar.access_token', auth.accessToken);
		localStorage.setItem('aldorar.user', JSON.stringify(auth.user));
	}

	clearTokens() {
		localStorage.clear();
	}
}
