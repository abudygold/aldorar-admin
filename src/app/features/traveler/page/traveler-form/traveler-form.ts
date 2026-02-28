import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Button, ButtonModel, Datepicker, Dropdown, Textbox } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseForm } from '../../../../core/common';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON, CANCEL_BUTTON, SAVE_BUTTON } from '../../../../shared/constant/button';
import {
	ITraveler,
	ITravelerForm,
	TRAVELER_DEFAULT_STATE,
	TRAVELER_EDIT_STATE,
	TRAVELER_SCHEMA_FORM,
	TRAVELERS_SCHEMA_FORM,
} from '../../../../shared/constant/formly';
import { TRAVELER_URL } from '../../../../shared/constant/global';

@Component({
	selector: 'app-traveler-form',
	imports: [
		NgTemplateOutlet,
		MatExpansionModule,
		MatTabsModule,
		MatDividerModule,
		MatProgressSpinnerModule,
		Textbox,
		Dropdown,
		Datepicker,
		Button,
		MessageValidation,
		FontAwesomeModule,
	],
	templateUrl: './traveler-form.html',
	styleUrl: './traveler-form.css',
})
export class TravelerForm extends BaseForm<ITravelerForm> {
	step = signal(0);
	btn = {
		save: signal<ButtonModel>(SAVE_BUTTON('Submit', () => this.handleSubmit())),
		cancel: signal<ButtonModel>(CANCEL_BUTTON('Cancel', () => this.navigateToList())),
		add: signal<ButtonModel>(ADD_NEW_BUTTON('Add Traveler', () => this.addNewTraveler())),
	};

	faIcon = {
		faTrash,
	};

	constructor() {
		super(TRAVELER_DEFAULT_STATE, (schemaPath) => TRAVELERS_SCHEMA_FORM(schemaPath));

		this.isPageLoaded.set(true);
		this.id() && this.getDetailService(TRAVELER_URL, TRAVELER_EDIT_STATE);
		this.id() && this.changeFormData((schemaPath) => TRAVELER_SCHEMA_FORM(schemaPath));

		setTimeout(() => this.isPageLoaded.set(false), 600);
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

	addNewTraveler(): void {
		this.formModel.update((form) => ({
			...form,
			travelers: [
				...form.travelers,
				{
					firstName: '',
					lastName: '',
					gender: '',
					birthDate: '',
					nationality: '',
					phone: '',
					email: '',
					passportNumber: '',
					passportIssuedDate: '',
					passportExpiredDate: '',
					passportIssuedCountry: '',
				} as ITraveler,
			],
		}));
	}

	removeTraveler(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel.update((form) => ({
			...form,
			travelers: form.travelers.filter((_, i) => i !== index),
		}));
	}

	handleSubmit(): void {
		const bodyReq = this.id()
			? this.formModel().traveler
			: { travelers: this.formModel().travelers };
		this.sendToApi(TRAVELER_URL, bodyReq, {}, () => this.navigateToList());
	}

	navigateToList(): void {
		this.route.navigate(['/secure/traveler']);
	}
}
