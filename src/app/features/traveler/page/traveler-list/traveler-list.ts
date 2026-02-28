import { Component } from '@angular/core';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BaseTable } from '../../../../core/common';
import { TRAVELER_URL } from '../../../../shared/constant/global';
import { CUSTOM_TYPE_TRAVELER, TRAVELER_TABLE } from '../../../../shared/constant/table';

@Component({
	selector: 'app-traveler-list',
	imports: [FontAwesomeModule, Table, Button],
	templateUrl: './traveler-list.html',
	styleUrl: './traveler-list.css',
})
export class TravelerList extends BaseTable {
	constructor() {
		super(TRAVELER_URL, TRAVELER_TABLE, CUSTOM_TYPE_TRAVELER);
		this.initAddButton('Add Traveler', () => this.navigateToPage(['./add']));
		this.addExtraIcons({
			faCircleCheck,
			faCircleXmark,
		});
	}
}
