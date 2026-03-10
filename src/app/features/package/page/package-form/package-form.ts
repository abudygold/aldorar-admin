import { Component, signal, ViewEncapsulation } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Button, ButtonModel } from '@devkitify/angular-ui-kit';
import { BaseForm } from '../../../../core/common';
import { CANCEL_BUTTON, SAVE_BUTTON } from '../../../../shared/constant/button';
import {
	IPackageForm,
	PACKAGE_DEFAULT_STATE,
	PACKAGE_EDIT_STATE,
	PACKAGE_SCHEMA_FORM,
} from '../../../../shared/constant/formly';
import { CATEGORIES_URL, PACKAGE_URL } from '../../../../shared/constant/global';
import { GetOptionsByCode, IHttpResponse, IOptionList } from '../../../../shared/interface/base';
import { PackageFormBasic } from '../../components/package-form-basic';
import { PackageFormBonus } from '../../components/package-form-bonus';
import { PackageFormFlight } from '../../components/package-form-flight';
import { PackageFormHotel } from '../../components/package-form-hotel';
import { PackageFormItinerary } from '../../components/package-form-itinerary';
import { PackageFormPrice } from '../../components/package-form-price';

@Component({
	selector: 'app-package-form',
	imports: [
		MatTabsModule,
		MatDividerModule,
		MatProgressSpinnerModule,
		Button,
		PackageFormBasic,
		PackageFormFlight,
		PackageFormHotel,
		PackageFormPrice,
		PackageFormBonus,
		PackageFormItinerary,
	],
	templateUrl: './package-form.html',
	styleUrl: './package-form.css',
	encapsulation: ViewEncapsulation.None,
})
export class PackageForm extends BaseForm<IPackageForm> {
	opt = {
		tripType: signal<IOptionList[]>([]),
		packageType: signal<IOptionList[]>([]),
		flightType: signal<IOptionList[]>([]),
		flightClass: signal<IOptionList[]>([]),
		airlines: signal<IOptionList[]>([]),
		airports: signal<IOptionList[]>([]),
		roomType: signal<IOptionList[]>([]),
	};
	btn = {
		save: signal<ButtonModel>(SAVE_BUTTON('Submit', () => this.handleSubmit())),
		cancel: signal<ButtonModel>(CANCEL_BUTTON('Cancel', () => this.navigateToList())),
	};

	constructor() {
		super(PACKAGE_DEFAULT_STATE, (schemaPath) => PACKAGE_SCHEMA_FORM(schemaPath));

		this.isPageLoaded.set(true);

		this.getOptionService();
		this.id() && this.getDetailService(PACKAGE_URL, PACKAGE_EDIT_STATE);

		setTimeout(() => this.isPageLoaded.set(false), 600);
	}

	getOptionService(): void {
		const code = 'TRIP_TYPE,PACKAGE_TYPE,FLIGHT_TYPE,FLIGHT_CLASS,AIRLINES,AIRPORT,ROOM_TYPE';
		this.api.get<IHttpResponse>(`${CATEGORIES_URL}/findByCode?code=${code}`).subscribe({
			next: (res) => {
				const data = (res?.data || []) as IOptionList[];
				this.opt.tripType.set(GetOptionsByCode(data, 'TRIP_TYPE'));
				this.opt.packageType.set(GetOptionsByCode(data, 'PACKAGE_TYPE'));
				this.opt.flightType.set(GetOptionsByCode(data, 'FLIGHT_TYPE'));
				this.opt.flightClass.set(GetOptionsByCode(data, 'FLIGHT_CLASS'));
				this.opt.airlines.set(GetOptionsByCode(data, 'AIRLINES'));
				this.opt.airports.set(GetOptionsByCode(data, 'AIRPORT'));
				this.opt.roomType.set(GetOptionsByCode(data, 'ROOM_TYPE'));
			},
		});
	}

	handleSubmit(): void {
		this.btn.save().disabled?.update((_) => true);
		this.btn.cancel().disabled?.update((_) => true);

		this.sendToApi(PACKAGE_URL, this.formModel(), {}, () => this.navigateToList());
	}

	navigateToList(): void {
		this.route.navigate(['/secure/package']);
	}
}
