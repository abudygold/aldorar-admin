import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseTable } from '../../../../core/common';
import { PACKAGE_URL } from '../../../../shared/config';
import { CREATE_BUTTON } from '../../../../shared/config/button';
import { PACKAGE_CUSTOM_TYPE, PACKAGE_TABLE } from '../../../../shared/config/table';

@Component({
	selector: 'app-package-list',
	imports: [MatCheckboxModule, FontAwesomeModule, Table, Button],
	templateUrl: './package-list.html',
	styleUrl: './package-list.css',
})
export class PackageList extends BaseTable {
	constructor() {
		super(
			PACKAGE_URL,
			PACKAGE_TABLE,
			PACKAGE_CUSTOM_TYPE,
			CREATE_BUTTON('Add Package', () => this.navigateToPage(['./add'])),
		);
	}

	onAction(action: 'edit' | 'delete', data?: any): void {
		switch (action) {
			case 'edit':
				this.navigateToPage(['./edit', data?.slug]);
				break;

			case 'delete':
				this.deleteService(data?.id);
				break;
		}
	}

	navigateToPage(page: string[]): void {
		this.router.navigate(page, {
			relativeTo: this.activatedRoute,
		});
	}
}
