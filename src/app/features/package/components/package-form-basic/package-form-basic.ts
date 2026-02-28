import { Component, input, model, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { Dropdown, SlideToggle, Textbox } from '@devkitify/angular-ui-kit';
import { MessageValidation } from '../../../../shared/components/message-validation';
import { IPackageForm } from '../../../../shared/constant/formly';
import { IOptionList } from '../../../../shared/interface/base';

@Component({
	selector: 'app-package-form-basic',
	imports: [Textbox, Dropdown, SlideToggle, MessageValidation],
	templateUrl: './package-form-basic.html',
	styleUrl: './package-form-basic.css',
})
export class PackageFormBasic {
	formModel = model.required<WritableSignal<IPackageForm>>();

	form = input.required<FieldTree<IPackageForm, string | number>>();
	options = input.required<{
		tripType: IOptionList[];
		packageType: IOptionList[];
	}>();

	durationChangeHandle(_event: Event): void {
		this.rebuildItinerary();
	}

	rebuildItinerary(): void {
		const formModel = this.formModel();
		const duration = formModel().durationDays;
		this.formModel()?.update((form) => {
			const newItineraries = Array.from({ length: duration }, (_, index) => ({
				dayNumber: index + 1,
				title: '',
				description: '',
				city: '',
				activityDate: '',
			}));

			return {
				...form,
				itineraries: newItineraries,
			};
		});
	}
}
