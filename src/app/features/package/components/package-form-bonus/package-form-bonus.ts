import { Component, model, signal, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatExpansionModule } from '@angular/material/expansion';
import { Button, ButtonModel, SlideToggle, Textarea, Textbox } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { ADD_NEW_BUTTON } from '../../../../shared/constant/button';
import { IBonus, IPackageForm } from '../../../../shared/constant/formly';

@Component({
	selector: 'app-package-form-bonus',
	imports: [
		MatExpansionModule,
		Textbox,
		Textarea,
		Button,
		SlideToggle,
		MessageValidation,
		FontAwesomeModule,
	],
	templateUrl: './package-form-bonus.html',
	styleUrl: './package-form-bonus.css',
})
export class PackageFormBonus {
	step = signal(0);
	addNewButton = signal<ButtonModel>(ADD_NEW_BUTTON('Add New Flight', () => this.addBonus()));

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

	addBonus(): void {
		this.formModel().update((form) => ({
			...form,
			bonuses: [
				...form.bonuses,
				{
					bonusName: '',
					description: '',
				} as IBonus,
			],
		}));
	}

	dropBonus(event: MouseEvent, index: number): void {
		event.stopPropagation();

		this.formModel().update((form) => ({
			...form,
			bonuses: form.bonuses.filter((_, i) => i !== index),
		}));
	}
}
