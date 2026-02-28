import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_CATEGORY = {
	selection: {
		type: 'custom',
	},
	label: {
		type: '',
	},
	code: {
		type: '',
	},
	value: {
		type: '',
	},
	createdAt: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	updatedAt: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	actions: {
		type: 'custom',
	},
};

export const CATEGORY_TABLE: TableModel = new TableModel();
CATEGORY_TABLE.columns = [
	{
		key: 'selection',
		label: '',
		sortable: false,
	},
	{
		key: 'label',
		label: 'Label',
		sortable: true,
	},
	{
		key: 'value',
		label: 'Value',
		sortable: true,
	},
	{
		key: 'code',
		label: 'Code',
		sortable: true,
	},
	{
		key: 'createdAt',
		label: 'Created At',
		sortable: true,
	},
	{
		key: 'updatedAt',
		label: 'Updated At',
		sortable: true,
	},
	{
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
CATEGORY_TABLE.sortActive = 'createdAt';
CATEGORY_TABLE.sortDirection = 'desc';
CATEGORY_TABLE.isServerSide.set(true);
CATEGORY_TABLE.isPagination.set(true);
