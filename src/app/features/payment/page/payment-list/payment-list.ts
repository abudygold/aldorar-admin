import { Component } from '@angular/core';
import { Button, CurrencyIntlPipe, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BaseTable } from '../../../../core/common';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { PAYMENT_URL } from '../../../../shared/constant/global';
import { CUSTOM_TYPE_PAYMENT, PAYMENT_TABLE } from '../../../../shared/constant/table';
import { PaymentForm } from '../payment-form';

@Component({
	selector: 'app-payment-list',
	imports: [FontAwesomeModule, Table, Button, StatusBadge, CurrencyIntlPipe],
	templateUrl: './payment-list.html',
	styleUrl: './payment-list.css',
})
export class PaymentList extends BaseTable {
	constructor() {
		super(PAYMENT_URL, PAYMENT_TABLE, CUSTOM_TYPE_PAYMENT);
		this.initAddButton('Add Payment', () => this.openFormDialog());
		this.addExtraIcons({
			faCircleCheck,
			faCircleXmark,
		});
	}

	openFormDialog(data: any = null): void {
		this.dialog
			.open(PaymentForm, {
				width: '800px',
				minWidth: '800px',
				data,
			})
			.afterClosed()
			.subscribe((isReload: boolean) => {
				if (!isReload) return;

				this.fetchData();
			});
	}
}
