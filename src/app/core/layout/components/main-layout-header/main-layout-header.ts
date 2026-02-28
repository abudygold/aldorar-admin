import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { LOGOUT_URL } from '../../../../shared/constant/global';
import { API, Auth } from '../../../services';

@Component({
	selector: 'app-main-layout-header',
	imports: [NgClass, MatToolbarModule, FontAwesomeModule],
	templateUrl: './main-layout-header.html',
	styleUrl: './main-layout-header.css',
})
export class MainLayoutHeader {
	#router = inject(Router);
	#auth = inject(Auth);
	#api = inject(API);

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
