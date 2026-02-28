import { Component, input, model, output, signal, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatExpansionModule } from '@angular/material/expansion';
import { Button, ButtonModel, Datepicker, Dropdown, Textbox } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON } from '../../../../shared/constant/button';
import { IFlight, IPackageForm } from '../../../../shared/constant/formly';
import { IOptionList } from '../../../../shared/interface/base';

@Component({
	selector: 'app-package-form-flight',
	imports: [
		MatExpansionModule,
		Textbox,
		Dropdown,
		Datepicker,
		Button,
		MessageValidation,
		FontAwesomeModule,
	],
	templateUrl: './package-form-flight.html',
	styleUrl: './package-form-flight.css',
})
export class PackageFormFlight {
	addFlightClicked = output<void>();

	step = signal(0);
	today = signal(new Date());
	addNewButton = signal<ButtonModel>(ADD_NEW_BUTTON('Add New Flight', () => this.addFlight()));

	form = model.required<FieldTree<IPackageForm, string | number>>();
	formModel = model.required<WritableSignal<IPackageForm>>();

	options = input.required<{
		flightType: IOptionList[];
		flightClass: IOptionList[];
		airlines: IOptionList[];
		airports: IOptionList[];
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

	addFlight(): void {
		this.formModel().update((form) => ({
			...form,
			flights: [
				...form.flights,
				{
					flightType: '',
					flightDate: '',
					airline: '',
					flightNumber: '',
					flightClass: '',
					departureAirport: '',
					arrivalAirport: '',
					sequence: form.flights.length,
				} as IFlight,
			],
		}));
	}

	dropFlight(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel().update((form) => ({
			...form,
			flights: form.flights.filter((_, i) => i !== index),
		}));
	}
}
