import { Component, model, signal, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatExpansionModule } from '@angular/material/expansion';
import { Button, ButtonModel, Datepicker, Dropdown, Textbox } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON } from '../../../../shared/constant/button';
import { IHotel, IPackageForm } from '../../../../shared/constant/formly';

@Component({
	selector: 'app-package-form-hotel',
	imports: [
		MatExpansionModule,
		Textbox,
		Dropdown,
		Datepicker,
		Button,
		MessageValidation,
		FontAwesomeModule,
	],
	templateUrl: './package-form-hotel.html',
	styleUrl: './package-form-hotel.css',
})
export class PackageFormHotel {
	step = signal(0);
	today = signal(new Date());
	addNewButton = signal<ButtonModel>(ADD_NEW_BUTTON('Add New Flight', () => this.addHotel()));

	form = model.required<FieldTree<IPackageForm, string | number>>();
	formModel = model.required<WritableSignal<IPackageForm>>();

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

	addHotel(): void {
		this.formModel().update((form) => ({
			...form,
			hotels: [
				...form.hotels,
				{
					city: '',
					country: '',
					hotelName: '',
					star: 1,
					checkInDate: '',
					checkOutDate: '',
					sequence: form.hotels.length,
				} as IHotel,
			],
		}));
	}

	dropHotel(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel().update((form) => ({
			...form,
			hotels: form.hotels.filter((_, i) => i !== index),
		}));
	}
}
