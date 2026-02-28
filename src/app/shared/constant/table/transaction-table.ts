import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_TRANSACTION = {
	invoiceNumber: {
		type: 'custom',
	},
	paymentStatus: {
		type: 'custom',
	},
	totalAmount: {
		type: 'custom',
	},
	totalPaid: {
		type: 'custom',
	},
	remainingAmount: {
		type: 'custom',
	},
	bookingStatus: {
		type: 'custom',
	},
	actions: {
		type: 'custom',
	},
};

export const TRANSACTION_TABLE: TableModel = new TableModel();
TRANSACTION_TABLE.columns = [
	{
		key: 'invoiceNumber',
		label: 'Transaction Number',
		sortable: true,
	},
	{
		key: 'packageName',
		label: 'Package',
		sortable: true,
	},
	/* {
		key: 'mainJamaah',
		label: 'Main Jamaah',
		sortable: false,
	}, */
	{
		key: 'totalParticipant',
		label: 'Pax',
		sortable: false,
	},
	{
		key: 'totalAmount',
		label: 'Total',
		sortable: false,
	},
	{
		key: 'totalPaid',
		label: 'Paid',
		sortable: false,
	},
	{
		key: 'remainingAmount',
		label: 'Remaining',
		sortable: false,
	},
	{
		key: 'paymentStatus',
		label: 'Status',
		sortable: false,
	},
	{
		key: 'bookingStatus',
		label: 'Booking Status',
		sortable: false,
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
TRANSACTION_TABLE.sortActive = 'createdAt';
TRANSACTION_TABLE.sortDirection = 'asc';
TRANSACTION_TABLE.isServerSide.set(true);
TRANSACTION_TABLE.isPagination.set(true);
