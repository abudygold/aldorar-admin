import { PathKind, required, SchemaPathTree } from '@angular/forms/signals';

type PAYMENT_TYPE = 'dp' | 'installment' | 'full_payment' | 'refund';
type PAYMENT_STATUS = 'unpaid' | 'dp_paid' | 'partially_paid' | 'paid' | 'cancelled' | 'refunded';

export interface IPaymentForm {
	tripTransactionId: string;
	paymentNumber: string;
	paymentMethod: string;
	paymentChannel: string;
	amount: number;
	paymentType: PAYMENT_TYPE;
	paymentStatus: PAYMENT_STATUS;
	paidAt: string;
	note: string;
	sequenceNumber: number;
}

export const PAYMENT_DEFAULT_STATE: IPaymentForm = {
	tripTransactionId: '',
	paymentNumber: '',
	paymentMethod: '',
	paymentChannel: '',
	amount: 0,
	paymentType: 'installment',
	paymentStatus: 'unpaid',
	paidAt: '',
	note: '',
	sequenceNumber: 0,
};

export const PAYMENT_EDIT_STATE = (data: any) => ({
	tripTransactionId: data?.tripTransactionId || '',
	paymentNumber: data?.paymentNumber || '',
	paymentMethod: data?.paymentMethod || '',
	paymentChannel: data?.paymentChannel || '',
	amount: data?.amount || 0,
	paymentType: data?.paymentType || '',
	paymentStatus: data?.paymentStatus || '',
	paidAt: data?.paidAt || '',
	note: data?.note || '',
	sequenceNumber: data?.sequenceNumber || '',
});

export const PAYMENT_SCHEMA_FORM = (schemaPath: SchemaPathTree<IPaymentForm, PathKind.Root>) => {
	required(schemaPath.tripTransactionId, { message: 'Trip Transaction is required' });
	required(schemaPath.paymentMethod, { message: 'Payment Method is required' });
	required(schemaPath.paymentChannel, { message: 'Payment Channel is required' });
	required(schemaPath.amount, { message: 'Amount is required' });
	required(schemaPath.paymentType, { message: 'Payment Type is required' });
	required(schemaPath.paymentStatus, { message: 'Payment Status is required' });
};
