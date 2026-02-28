import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BaseTable } from '../../../../core/common';
import { PACKAGE_URL } from '../../../../shared/constant/global';
import { CUSTOM_TYPE_PACKAGE, PACKAGE_TABLE } from '../../../../shared/constant/table';

@Component({
	selector: 'app-package-list',
	imports: [FormsModule, MatSlideToggleModule, FontAwesomeModule, DatePipe, Table, Button],
	templateUrl: './package-list.html',
	styleUrl: './package-list.css',
})
export class PackageList extends BaseTable {
	constructor() {
		super(PACKAGE_URL, PACKAGE_TABLE, CUSTOM_TYPE_PACKAGE);
		this.initAddButton('Add Package', () => this.navigateToPage(['./add']));
		this.addExtraIcons({
			faCircleCheck,
			faCircleXmark,
		});
	}

	updatePackageStatus(slug: number, isPublish: boolean): void {
		this.api
			.put(`${PACKAGE_URL}/status/${slug}`, { isPublish })
			.subscribe(() => this.fetchData());
	}

	getFlightDate(flights: any[], dateType: 'departure' | 'return'): Date | string {
		if (!flights || flights.length === 0) return 'N/A';

		if (dateType === 'return') return new Date(flights.at(-1).flightDate);

		return new Date(flights.at(0).flightDate);
	}
}
