import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_PACKAGE = {
	departureDate: {
		type: 'custom',
	},
	returnDate: {
		type: 'custom',
	},
	availableSeats: {
		type: 'custom',
	},
	isPublish: {
		type: 'custom',
	},
	actions: {
		type: 'custom',
	},
};

export const PACKAGE_TABLE: TableModel = new TableModel();
PACKAGE_TABLE.columns = [
	{
		key: 'title',
		label: 'Package Name',
		sortable: true,
	},
	{
		key: 'packageType',
		label: 'Package Type',
		sortable: true,
	},
	{
		key: 'tripType',
		label: 'Trip Type',
		sortable: true,
	},
	{
		key: 'durationDays',
		label: 'Durasi',
		sortable: true,
	},
	{
		key: 'departureDate',
		label: 'Departure Date',
		sortable: true,
	},
	{
		key: 'returnDate',
		label: 'Return Date',
		sortable: true,
	},
	{
		key: 'quota',
		label: 'Quota',
		sortable: true,
	},
	{
		key: 'quotaUsed',
		label: 'Booked',
		sortable: true,
	},
	{
		key: 'availableSeats',
		label: 'Available Seats',
		sortable: true,
	},
	{
		key: 'isPublish',
		label: 'Status',
		sortable: false,
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
PACKAGE_TABLE.sortActive = 'title';
PACKAGE_TABLE.sortDirection = 'asc';
PACKAGE_TABLE.isServerSide.set(true);
PACKAGE_TABLE.isPagination.set(true);
