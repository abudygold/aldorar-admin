import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_PAYMENT = {
	paymentNumber: {
		type: 'custom',
	},
	amount: {
		type: 'custom',
	},
	paymentStatus: {
		type: 'custom',
	},
	actions: {
		type: 'custom',
	},
};

export const PAYMENT_TABLE: TableModel = new TableModel();
PAYMENT_TABLE.columns = [
	{
		key: 'paymentNumber',
		label: 'Payment Number',
		sortable: true,
	},
	{
		key: 'paymentType',
		label: 'Type',
		sortable: true,
	},
	{
		key: 'paymentMethod',
		label: 'Method',
		sortable: true,
	},
	{
		key: 'paymentChannel',
		label: 'Channel',
		sortable: true,
	},
	{
		key: 'amount',
		label: 'Amount',
		sortable: false,
	},
	{
		key: 'paidAt',
		label: 'Paid At',
		sortable: false,
	},
	{
		key: 'paymentStatus',
		label: 'Status',
		sortable: false,
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
PAYMENT_TABLE.sortActive = 'firstName';
PAYMENT_TABLE.sortDirection = 'asc';
PAYMENT_TABLE.isServerSide.set(true);
PAYMENT_TABLE.isPagination.set(true);
