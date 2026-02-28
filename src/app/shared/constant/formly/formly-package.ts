import { applyEach, PathKind, required, SchemaPathTree } from '@angular/forms/signals';

export interface IFlight {
	flightType: 'departure' | 'return' | '';
	flightDate: string;
	airline: string;
	flightNumber: string;
	flightClass: 'economy' | 'business' | 'first' | '';
	departureAirport: string;
	arrivalAirport: string;
	sequence: number;
}

export interface IHotel {
	city: string;
	country: string;
	hotelName: string;
	star: number;
	checkInDate: string;
	checkOutDate: string;
	sequence: number;
}

export interface IPrice {
	roomType: 'quad' | 'triple' | 'double' | '';
	price: number;
	dpAmount: number;
	childPrice: number;
	infantPrice: number;
	currency: string;
	validFrom: string;
	validUntil: string;
	isActive: boolean;
}

export interface IBonus {
	bonusName: string;
	description: string;
	isOptional: boolean;
}

export interface IItinerary {
	dayNumber: number;
	title: string;
	description: string;
	city: string;
	activityDate: string;
}

export interface IPackageForm {
	title: string;
	durationDays: number;
	quota: number;
	packageType: 'umrah' | 'hajj' | 'trip';
	tripType: 'regular' | 'plus' | 'private' | 'vip';
	isPublish: boolean;
	flights: IFlight[];
	hotels: IHotel[];
	prices: IPrice[];
	bonuses: IBonus[];
	itineraries: IItinerary[];
}

export const PACKAGE_DEFAULT_STATE: IPackageForm = {
	title: '',
	durationDays: 0,
	quota: 0,
	packageType: 'umrah',
	tripType: 'regular',
	isPublish: false,
	flights: [],
	hotels: [],
	prices: [],
	bonuses: [],
	itineraries: [],
};

export const PACKAGE_EDIT_STATE = (data: any) => ({
	title: data?.title || '',
	durationDays: data?.durationDays || 0,
	quota: data?.quota || 0,
	packageType: data?.packageType || 'umrah',
	tripType: data?.tripType || 'regular',
	isPublish: data?.isPublish || false,
	flights: data?.flights || [],
	hotels: data?.hotels || [],
	prices: data?.prices || [],
	bonuses: data?.bonuses || [],
	itineraries: data?.itineraries || [],
});

export const PACKAGE_SCHEMA_FORM = (schemaPath: SchemaPathTree<IPackageForm, PathKind.Root>) => {
	required(schemaPath.title, { message: 'Package Name is required' });
	required(schemaPath.packageType, { message: 'Package Type is required' });
	required(schemaPath.tripType, { message: 'Trip Type is required' });
	required(schemaPath.durationDays, { message: 'Duration Days is required' });
	required(schemaPath.quota, { message: 'Quota is required' });
	applyEach(schemaPath.flights, (itemPath) => {
		required(itemPath.flightType, { message: 'Flight Type is required' });
		required(itemPath.flightDate, { message: 'Flight Date is required' });
		required(itemPath.airline, { message: 'Airline is required' });
		required(itemPath.flightNumber, { message: 'Flight Number is required' });
		required(itemPath.flightClass, { message: 'Flight Class is required' });
		required(itemPath.departureAirport, { message: 'Departure Airport is required' });
		required(itemPath.arrivalAirport, { message: 'Arrival Airport is required' });
	});
	applyEach(schemaPath.hotels, (itemPath) => {
		required(itemPath.city, { message: 'City is required' });
		required(itemPath.country, { message: 'Country is required' });
		required(itemPath.hotelName, { message: 'Hotel Name is required' });
		required(itemPath.star, { message: 'Star is required' });
		required(itemPath.checkInDate, { message: 'Check In Date is required' });
		required(itemPath.checkInDate, { message: 'Check Out Date is required' });
	});
	applyEach(schemaPath.prices, (itemPath) => {
		required(itemPath.roomType, { message: 'Room Type is required' });
		required(itemPath.price, { message: 'Price is required' });
		required(itemPath.dpAmount, { message: 'DP Amount is required' });
		required(itemPath.childPrice, { message: 'Child Price is required' });
		required(itemPath.infantPrice, { message: 'Infant Price is required' });
	});
	applyEach(schemaPath.bonuses, (itemPath) => {
		required(itemPath.bonusName, { message: 'Bonus Name is required' });
		required(itemPath.description, { message: 'Description is required' });
	});
	applyEach(schemaPath.itineraries, (itemPath) => {
		required(itemPath.title, { message: 'Title is required' });
		required(itemPath.description, { message: 'Description is required' });
	});
};
