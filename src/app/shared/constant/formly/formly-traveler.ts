import { applyEach, email, PathKind, required, SchemaPathTree } from '@angular/forms/signals';

export interface ITraveler {
	firstName: string;
	lastName: string;
	gender: 'male' | 'female' | '';
	birthDate: string;
	nationality: string;
	phone: string;
	email: string;
	passportNumber: string;
	passportIssuedDate: string;
	passportExpiredDate: string;
	passportIssuedCountry: string;
}

export interface ITravelerForm {
	traveler: ITraveler;
	travelers: ITraveler[];
}

export const TRAVELER_DEFAULT_STATE: ITravelerForm = {
	travelers: [],
	traveler: {
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
	},
};

export const TRAVELER_EDIT_STATE = (data: any) => ({
	travelers: [],
	traveler: {
		firstName: data?.firstName || '',
		lastName: data?.lastName || '',
		gender: data?.gender || '',
		birthDate: data?.birthDate || '',
		nationality: data?.nationality || '',
		phone: data?.phone || '',
		email: data?.email || '',
		passportNumber: data?.passportNumber || '',
		passportIssuedDate: data?.passportIssuedDate || '',
		passportExpiredDate: data?.passportExpiredDate || '',
		passportIssuedCountry: data?.passportIssuedCountry || '',
		travelers: data?.travelers || [],
	},
});

export const TRAVELER_SCHEMA_FORM = (schemaPath: SchemaPathTree<ITravelerForm, PathKind.Root>) => {
	required(schemaPath.traveler.firstName, { message: 'First Name is required' });
	required(schemaPath.traveler.lastName, { message: 'Last Name is required' });
	required(schemaPath.traveler.gender, { message: 'Gender is required' });
	required(schemaPath.traveler.birthDate, { message: 'Birth Date is required' });
	required(schemaPath.traveler.nationality, { message: 'Nationality is required' });
	required(schemaPath.traveler.phone, { message: 'Phone is required' });
	required(schemaPath.traveler.email, { message: 'E-Mail is required' });
	email(schemaPath.traveler.email, { message: 'Enter a valid email address' });
	required(schemaPath.traveler.passportNumber, { message: 'Passport Number is required' });
	required(schemaPath.traveler.passportIssuedDate, {
		message: 'Passport Issued Date is required',
	});
	required(schemaPath.traveler.passportExpiredDate, {
		message: 'Passport Expired Date is required',
	});
	required(schemaPath.traveler.passportIssuedCountry, {
		message: 'Passport Issued Country is required',
	});
};

export const TRAVELERS_SCHEMA_FORM = (schemaPath: SchemaPathTree<ITravelerForm, PathKind.Root>) => {
	applyEach(schemaPath.travelers, (itemPath) => {
		required(itemPath.firstName, { message: 'First Name is required' });
		required(itemPath.lastName, { message: 'Last Name is required' });
		required(itemPath.gender, { message: 'Gender is required' });
		required(itemPath.birthDate, { message: 'Birth Date is required' });
		required(itemPath.nationality, { message: 'Nationality is required' });
		required(itemPath.phone, { message: 'Phone is required' });
		required(itemPath.email, { message: 'E-Mail is required' });
		email(itemPath.email, { message: 'Enter a valid email address' });
		required(itemPath.passportNumber, { message: 'Passport Number is required' });
		required(itemPath.passportIssuedDate, {
			message: 'Passport Issued Date is required',
		});
		required(itemPath.passportExpiredDate, {
			message: 'Passport Expired Date is required',
		});
		required(itemPath.passportIssuedCountry, {
			message: 'Passport Issued Country is required',
		});
	});
};
