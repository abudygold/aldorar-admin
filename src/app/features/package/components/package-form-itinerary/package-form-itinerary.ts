import { Component, model, signal, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatExpansionModule } from '@angular/material/expansion';
import { Button, ButtonModel, Datepicker, Textarea, Textbox } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON } from '../../../../shared/constant/button';
import { IItinerary, IPackageForm } from '../../../../shared/constant/formly';

@Component({
	selector: 'app-package-form-itinerary',
	imports: [
		MatExpansionModule,
		Textbox,
		Textarea,
		Datepicker,
		Button,
		MessageValidation,
		FontAwesomeModule,
	],
	templateUrl: './package-form-itinerary.html',
	styleUrl: './package-form-itinerary.css',
})
export class PackageFormItinerary {
	step = signal(0);
	today = signal(new Date());
	addNewButton = signal<ButtonModel>(
		ADD_NEW_BUTTON('Add New Itinerary', () => this.addItinerary()),
	);

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

	addItinerary(): void {
		this.formModel().update((form) => ({
			...form,
			itineraries: [
				...form.itineraries,
				{
					dayNumber: form.itineraries.length,
					title: '',
					description: '',
				} as IItinerary,
			],
		}));
	}

	dropItinerary(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel().update((form) => ({
			...form,
			itineraries: form.itineraries.filter((_, i) => i !== index),
		}));
	}
}
