import { Component, input, model, signal, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatExpansionModule } from '@angular/material/expansion';
import {
	Button,
	ButtonModel,
	Datepicker,
	Dropdown,
	SlideToggle,
	Textbox,
	TextboxCurrency,
} from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON } from '../../../../shared/constant/button';
import { IPackageForm, IPrice } from '../../../../shared/constant/formly';
import { IOptionList } from '../../../../shared/interface/base';

@Component({
	selector: 'app-package-form-price',
	imports: [
		MatExpansionModule,
		Textbox,
		TextboxCurrency,
		Dropdown,
		Button,
		Datepicker,
		SlideToggle,
		MessageValidation,
		FontAwesomeModule,
	],
	templateUrl: './package-form-price.html',
	styleUrl: './package-form-price.css',
})
export class PackageFormPrice {
	step = signal(0);
	today = signal(new Date());
	addNewButton = signal<ButtonModel>(ADD_NEW_BUTTON('Add New Flight', () => this.addPrice()));

	form = model.required<FieldTree<IPackageForm, string | number>>();
	formModel = model.required<WritableSignal<IPackageForm>>();
	options = input.required<{
		roomType: IOptionList[];
	}>();

	faIcon = {
		faTrash,
	};

	setStep(index: number) {
		this.step.set(index);
	}

	nextStep() {
		this.step.update((i) => i + 1);
	}

	prevStep() {
		this.step.update((i) => i - 1);
	}

	addPrice(): void {
		this.formModel().update((form) => ({
			...form,
			prices: [
				...form.prices,
				{
					roomType: '',
					price: 0,
					dpAmount: 0,
					childPrice: 0,
					infantPrice: 0,
				} as IPrice,
			],
		}));
	}

	dropPrice(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel().update((form) => ({
			...form,
			prices: form.prices.filter((_, i) => i !== index),
		}));
	}
}
