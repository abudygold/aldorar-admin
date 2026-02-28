import { applyEach, PathKind, required, SchemaPathTree } from '@angular/forms/signals';

export interface ITransactionTraveler {
	tripTransactionId: string;
	travelerId: string;
}

export interface ITransactionForm {
	tripPackageId: string;
	totalParticipant: number;
	pricePerPerson: number;
	subtotal: number;
	groupDiscount: number;
	additionalFee: number;
	marketingFee: number;
	totalAmount: number;
	totalPaid: number;
	note: string;
	sequenceNumber: number;
	travelers: ITransactionTraveler[];
}

export const TRANSACTION_DEFAULT_STATE: ITransactionForm = {
	tripPackageId: '',
	totalParticipant: 0,
	pricePerPerson: 0,
	subtotal: 0,
	groupDiscount: 0,
	additionalFee: 0,
	marketingFee: 0,
	totalAmount: 0,
	totalPaid: 0,
	note: '',
	sequenceNumber: 0,
	travelers: [],
};

export const TRANSACTION_EDIT_STATE = (data: any) => ({
	tripPackageId: data?.tripPackageId || '',
	totalParticipant: data?.totalParticipant || 0,
	pricePerPerson: data?.pricePerPerson || 0,
	subtotal: data?.subtotal || 0,
	groupDiscount: data?.groupDiscount || 0,
	additionalFee: data?.additionalFee || 0,
	marketingFee: data?.marketingFee || 0,
	totalAmount: data?.totalAmount || 0,
	totalPaid: data?.totalPaid || 0,
	note: '',
	travelers: data?.travelers || [],
});

export const TRANSACTION_SCHEMA_FORM = (
	schemaPath: SchemaPathTree<ITransactionForm, PathKind.Root>,
) => {
	required(schemaPath.tripPackageId, { message: 'Trip Package is required' });
	required(schemaPath.pricePerPerson, { message: 'Trip Price is required' });
	applyEach(schemaPath.travelers, (itemPath) => {
		required(itemPath.travelerId, { message: 'Traveler is required' });
	});
};
