import { Component } from '@angular/core';
import { Button, CurrencyIntlPipe, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BaseTable } from '../../../../core/common';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { TRANSACTION_URL } from '../../../../shared/constant/global';
import { CUSTOM_TYPE_TRANSACTION, TRANSACTION_TABLE } from '../../../../shared/constant/table';

@Component({
	selector: 'app-transaction-list',
	imports: [Table, Button, StatusBadge, FontAwesomeModule, CurrencyIntlPipe],
	templateUrl: './transaction-list.html',
	styleUrl: './transaction-list.css',
})
export class TransactionList extends BaseTable {
	constructor() {
		super(TRANSACTION_URL, TRANSACTION_TABLE, CUSTOM_TYPE_TRANSACTION);
		this.initAddButton('Add Transaction', () => this.navigateToPage(['./add']));
		this.addExtraIcons({
			faCircleCheck,
			faCircleXmark,
		});
	}
}
