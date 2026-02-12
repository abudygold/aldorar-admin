import { PathKind, required, SchemaPathTree } from '@angular/forms/signals';
import { IOptionList } from '../interface/base';

export interface IPackageForm {
	id?: string;
	title: string;
	tripType: string;
	durationDays: number;
	quota: number;
	departureDate: string;
	departureAirline: string;
	departureFlightType: string;
	departureLanding: string;
	returnDate: string;
	returnAirline: string;
	returnFlightType: string;
	returnLanding: string;
	madinahHotelName: string;
	madinahHotelStar: number;
	mekkahHotelName: string;
	mekkahHotelStar: number;
	isPlusThaif: boolean;
	isHighSpeedTrain: boolean;
	isPublish: boolean;
}

export const STATE_DEFAULT_PACKAGE = {
	id: '',
	title: '',
	tripType: 'regular',
	durationDays: 0,
	quota: 0,
	departureDate: '',
	departureAirline: '',
	departureFlightType: '',
	departureLanding: '',
	returnDate: '',
	returnAirline: '',
	returnFlightType: '',
	returnLanding: '',
	madinahHotelName: '',
	madinahHotelStar: 0,
	mekkahHotelName: '',
	mekkahHotelStar: 0,
	isPlusThaif: false,
	isHighSpeedTrain: false,
	isPublish: false,
};

export const STATE_EDIT_PACKAGE = (data: any) => ({
	id: data?.id || '',
	title: data?.title || '',
	tripType: data?.tripType || '',
	durationDays: data?.durationDays || '',
	quota: data?.quota || '',
	departureDate: data?.departureDate || '',
	departureAirline: data?.departureAirline || '',
	departureFlightType: data?.departureFlightType || '',
	departureLanding: data?.departureLanding || '',
	returnDate: data?.returnDate || '',
	returnAirline: data?.returnAirline || '',
	returnFlightType: data?.returnFlightType || '',
	returnLanding: data?.returnLanding || '',
	madinahHotelName: data?.madinahHotelName || '',
	madinahHotelStar: data?.madinahHotelStar || '',
	mekkahHotelName: data?.mekkahHotelName || '',
	mekkahHotelStar: data?.mekkahHotelStar || '',
	isPlusThaif: data?.isPlusThaif || '',
	isHighSpeedTrain: data?.isHighSpeedTrain || '',
	isPublish: data?.isPublish || '',
});

export const FORM_SCHEMA_PACKAGE = (schemaPath: SchemaPathTree<IPackageForm, PathKind.Root>) => {
	required(schemaPath.title, { message: 'Title is required' });
	required(schemaPath.tripType, { message: 'Umrah Type is required' });
	required(schemaPath.durationDays, { message: 'Duration Days is required' });
	required(schemaPath.quota, { message: 'Quota is required' });
	required(schemaPath.departureDate, { message: 'Departure Date is required' });
	required(schemaPath.departureAirline, { message: 'Departure Airline is required' });
	required(schemaPath.departureFlightType, { message: 'Departure Flight Type is required' });
	required(schemaPath.departureLanding, { message: 'Departure Landing is required' });
	required(schemaPath.returnDate, { message: 'Return Date is required' });
	required(schemaPath.returnAirline, { message: 'Return Airline is required' });
	required(schemaPath.returnFlightType, { message: 'Return Flight Type is required' });
	required(schemaPath.returnLanding, { message: 'Return Landing is required' });
	required(schemaPath.madinahHotelName, { message: 'Madinah Hotel Name is required' });
	required(schemaPath.madinahHotelStar, { message: 'Madinah Hotel Star is required' });
	required(schemaPath.mekkahHotelName, { message: 'Mekkah Hotel Name is required' });
	required(schemaPath.mekkahHotelStar, { message: 'Mekkah Hotel Star is required' });
};

export const UMRAH_TYPE: IOptionList[] = [
	{
		label: 'Regular',
		value: 'regular',
	},
	{
		label: 'Plus',
		value: 'plus',
	},
	{
		label: 'Private',
		value: 'private',
	},
];

export const FLIGHT_TYPE: IOptionList[] = [
	{
		label: 'Direct',
		value: 'direct',
	},
	{
		label: 'Transit',
		value: 'transit',
	},
];
