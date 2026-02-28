import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
	Autocomplete,
	Datepicker,
	Dialog,
	Dropdown,
	Textarea,
	Textbox,
	TextboxCurrency,
} from '@devkitify/angular-ui-kit';
import { BaseForm } from '../../../../core/common';
import { MessageValidation } from '../../../../shared/components/message-validation';
import {
	IPaymentForm,
	PAYMENT_DEFAULT_STATE,
	PAYMENT_EDIT_STATE,
	PAYMENT_SCHEMA_FORM,
} from '../../../../shared/constant/formly/formly-payment';
import { CATEGORIES_URL, PAYMENT_URL, TRANSACTION_URL } from '../../../../shared/constant/global';
import { GetOptionsByCode, IHttpResponse, IOptionList } from '../../../../shared/interface/base';

@Component({
	selector: 'app-payment-form',
	imports: [
		MatButtonModule,
		Dialog,
		Textbox,
		Textarea,
		Autocomplete,
		TextboxCurrency,
		Dropdown,
		Datepicker,
		MessageValidation,
	],
	templateUrl: './payment-form.html',
	styleUrl: './payment-form.css',
})
export class PaymentForm extends BaseForm<IPaymentForm> {
	protected dialogRef = inject(MatDialogRef<PaymentForm>);
	protected data = inject(MAT_DIALOG_DATA);

	today = signal(new Date());
	opt = {
		paymentStatus: signal<IOptionList[]>([]),
		paymentType: signal<IOptionList[]>([]),
		transaction: signal<any[]>([]),
	};

	private debounceTimer: any;

	constructor() {
		super(PAYMENT_DEFAULT_STATE, (schemaPath) => PAYMENT_SCHEMA_FORM(schemaPath));

		this.id.set(this.data?.id || null);
		this.getSequence();
		this.getOptionService();
		this.id() && this.getTransactionOptions();
		this.id() && this.formModel.set(PAYMENT_EDIT_STATE(this.data));
	}

	getSequence(): void {
		this.api.get<IHttpResponse>(PAYMENT_URL + '/sequence').subscribe({
			next: (res) => this.formData.sequenceNumber().value.set(res.data),
		});
	}

	onInputTransactionHandle(event: Event): void {
		clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			const inputValue = (event.target as HTMLInputElement).value;
			this.getTransactionOptions(inputValue);
		}, 600);
	}

	getTransactionOptions(invoiceNumber: string = ''): void {
		this.api
			.get<IHttpResponse>(
				`${TRANSACTION_URL}?transactionId=${this.data?.tripTransactionId || ''}&invoiceNumber=${invoiceNumber}`,
			)
			.subscribe({
				next: (res) => this.opt.transaction.set(res.data?.rows || []),
			});
	}

	getOptionService(): void {
		this.api
			.get<IHttpResponse>(`${CATEGORIES_URL}/findByCode?code=PAYMENT_TYPE,PAYMENT_STATUS`)
			.subscribe({
				next: (res) => {
					const data = (res?.data || []) as IOptionList[];
					this.opt.paymentType.set(GetOptionsByCode(data, 'PAYMENT_TYPE'));
					this.opt.paymentStatus.set(GetOptionsByCode(data, 'PAYMENT_STATUS'));
				},
			});
	}

	handleSubmit(): void {
		const bodyReq = {
			...this.formModel(),
			amount: +this.formModel().amount,
		};
		this.sendToApi(PAYMENT_URL, bodyReq, {}, () => this.dialogRef.close(true));
	}
}
