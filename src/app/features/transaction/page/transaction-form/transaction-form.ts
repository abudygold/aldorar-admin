import { Component, computed, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectChange } from '@angular/material/select';
import {
	Autocomplete,
	Button,
	ButtonModel,
	CurrencyIntlPipe,
	Dropdown,
	Textarea,
	TextboxCurrency,
} from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseForm } from '../../../../core/common';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON, CANCEL_BUTTON, SAVE_BUTTON } from '../../../../shared/constant/button';
import {
	ITransactionForm,
	ITransactionTraveler,
	TRANSACTION_DEFAULT_STATE,
	TRANSACTION_EDIT_STATE,
	TRANSACTION_SCHEMA_FORM,
} from '../../../../shared/constant/formly/formly-transaction';
import { PACKAGE_URL, TRANSACTION_URL, TRAVELER_URL } from '../../../../shared/constant/global';
import { IHttpResponse } from '../../../../shared/interface/base';

@Component({
	selector: 'app-transaction-form',
	imports: [
		MatExpansionModule,
		MatProgressSpinnerModule,
		MatDividerModule,
		Autocomplete,
		TextboxCurrency,
		Textarea,
		Button,
		Dropdown,
		MessageValidation,
		CurrencyIntlPipe,
		FontAwesomeModule,
	],
	templateUrl: './transaction-form.html',
	styleUrl: './transaction-form.css',
})
export class TransactionForm extends BaseForm<ITransactionForm> {
	btn = {
		save: signal<ButtonModel>(SAVE_BUTTON('Submit', () => this.handleSubmit())),
		cancel: signal<ButtonModel>(CANCEL_BUTTON('Cancel', () => this.navigateToList())),
		add: signal<ButtonModel>(ADD_NEW_BUTTON('Add Traveler', () => this.addTraveler())),
	};
	opt = {
		packages: signal<any[]>([]),
		travelers: signal<any[]>([]),
	};
	step = signal(0);
	priceSelected = signal<any>(null);

	priceOptions = computed<any[]>(
		() =>
			(this.opt.packages()?.find((t) => t.id === this.formModel().tripPackageId)
				?.prices as any[]) || [],
	);

	private debounceTimer: any;

	faIcon = {
		faTrash,
	};

	constructor() {
		super(TRANSACTION_DEFAULT_STATE, (schemaPath) => TRANSACTION_SCHEMA_FORM(schemaPath));

		this.isPageLoaded.set(true);
		this.getSequence();
		this.id() && this.getPackageOptions(this.id());
		this.id() &&
			this.getDetailService(TRANSACTION_URL, TRANSACTION_EDIT_STATE, (res) =>
				this.#setValue(res),
			);

		setTimeout(() => this.isPageLoaded.set(false), 600);
	}

	#setValue(res: any) {
		this.opt.travelers.set(
			res?.data.travelers.map((t: any) => ({
				id: t.travelerId,
				fullName: `${t.firstName} ${t.lastName}`,
			})),
		);
	}

	getSequence(): void {
		this.api.get<IHttpResponse>(TRANSACTION_URL + '/sequence').subscribe({
			next: (res) => this.formData.sequenceNumber().value.set(res.data),
		});
	}

	onInputPackageHandle(event: Event): void {
		clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			const inputValue = (event.target as HTMLInputElement).value;
			this.getPackageOptions(inputValue);
		}, 600);
	}

	getPackageOptions(tripTransactionId: string = ''): void {
		this.api
			.get<IHttpResponse>(`${PACKAGE_URL}?tripTransactionId=${tripTransactionId || ''}`)
			.subscribe({
				next: (res) => this.opt.packages.set(res.data?.rows || []),
			});
	}

	onInputTravelerHandle(event: Event): void {
		clearTimeout(this.debounceTimer);

		this.debounceTimer = setTimeout(() => {
			const inputValue = (event.target as HTMLInputElement).value;
			this.getTravelerOptions(inputValue);
		}, 600);
	}

	getTravelerOptions(tripTransactionId: string = ''): void {
		this.api
			.get<IHttpResponse>(`${TRAVELER_URL}?tripTransactionId=${tripTransactionId || ''}`)
			.subscribe({
				next: (res) => this.opt.travelers.set(res.data?.rows || []),
			});
	}

	onPriceChangeHandle(selectChange: MatSelectChange): void {
		this.priceSelected.set(selectChange.value);
	}

	setStep(index: number) {
		this.step.set(index);
	}

	nextStep() {
		this.step.update((i) => i + 1);
	}

	prevStep() {
		this.step.update((i) => i - 1);
	}

	addTraveler(): void {
		this.formModel.update((form) => ({
			...form,
			travelers: [
				...form.travelers,
				{
					tripTransactionId: this.formModel().tripPackageId,
					travelerId: '',
				} as ITransactionTraveler,
			],
		}));
	}

	dropTraveler(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel.update((form) => ({
			...form,
			travelers: form.travelers.filter((_, i) => i !== index),
		}));
	}

	handleSubmit(): void {
		const { travelers, pricePerPerson, groupDiscount, additionalFee, marketingFee } =
			this.formModel();
		const totalTravelers = travelers.length;
		const pricePerPax = (pricePerPerson as any).price;
		const subtotal = pricePerPax * totalTravelers;
		const totalAmount = subtotal - groupDiscount - additionalFee - marketingFee;

		const bodyReq = {
			...this.formModel(),
			totalParticipant: totalTravelers,
			subtotal,
			totalAmount,
			pricePerPerson: pricePerPax,
		};

		this.btn.save().disabled?.update((_) => true);
		this.btn.cancel().disabled?.update((_) => true);

		this.sendToApi(TRANSACTION_URL, bodyReq, {}, () => this.navigateToList());
	}

	navigateToList(): void {
		this.route.navigate(['/secure/transaction']);
	}
}
