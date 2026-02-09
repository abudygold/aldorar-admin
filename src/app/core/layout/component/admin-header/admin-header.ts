import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { LOGOUT_URL } from '../../../../shared/config';
import { API, Auth } from '../../../services';

@Component({
	selector: 'app-admin-header',
	imports: [NgClass, MatToolbarModule, FontAwesomeModule],
	templateUrl: './admin-header.html',
	styleUrl: './admin-header.css',
})
export class AdminHeader {
	#router = inject(Router);
	#api = inject(API);
	#auth = inject(Auth);

	toggleMenu = output<void>();

	faIcon = {
		faBars,
		faSignOut,
	};

	isMobile = input<boolean>(false);

	onLogout(): void {
		this.#api.post(LOGOUT_URL, null).subscribe({
			next: () => {
				this.#auth.clearTokens();
				this.#router.navigate(['./auth']);
			},
		});
	}
}
