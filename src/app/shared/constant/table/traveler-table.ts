import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_TRAVELER = {
	fullName: {
		type: 'custom',
	},
	actions: {
		type: 'custom',
	},
};

export const TRAVELER_TABLE: TableModel = new TableModel();
TRAVELER_TABLE.columns = [
	{
		key: 'fullName',
		label: 'Full Name',
		sortable: true,
	},
	{
		key: 'passportNumber',
		label: 'Passport Number',
		sortable: true,
	},
	{
		key: 'phone',
		label: 'Phone Number',
		sortable: true,
	},
	{
		key: 'email',
		label: 'E-Mail',
		sortable: true,
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
TRAVELER_TABLE.sortActive = 'firstName';
TRAVELER_TABLE.sortDirection = 'asc';
TRAVELER_TABLE.isServerSide.set(true);
TRAVELER_TABLE.isPagination.set(true);
