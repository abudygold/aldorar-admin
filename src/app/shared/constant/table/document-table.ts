import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_DOCUMENT = {
	completion: {
		type: 'custom',
	},
	actions: {
		type: 'custom',
	},
};

export const DOCUMENT_TABLE: TableModel = new TableModel();
DOCUMENT_TABLE.columns = [
	{
		key: 'travelerName',
		label: 'Traveler Name',
		sortable: true,
	},
	{
		key: 'packageName',
		label: 'Package Name',
		sortable: true,
	},
	{
		key: 'completion',
		label: 'Completion',
		sortable: false,
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
DOCUMENT_TABLE.sortActive = 'travelerName';
DOCUMENT_TABLE.sortDirection = 'asc';
DOCUMENT_TABLE.isServerSide.set(true);
DOCUMENT_TABLE.isPagination.set(true);
