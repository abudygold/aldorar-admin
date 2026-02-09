import { TableModel } from '@devkitify/angular-ui-kit';

export const BLOG_CATEGORY_CUSTOM_TYPE = {
	selection: {
		type: 'custom',
	},
	createdAt: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	actions: {
		type: 'custom',
	},
};

export const BLOG_CATEGORY_TABLE: TableModel = new TableModel();
BLOG_CATEGORY_TABLE.columns = [
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
		key: 'actions',
		label: 'Actions',
		sortable: false,
	},
];
BLOG_CATEGORY_TABLE.sortActive = 'label';
BLOG_CATEGORY_TABLE.sortDirection = 'asc';
BLOG_CATEGORY_TABLE.isHttpPagination.set(true);
BLOG_CATEGORY_TABLE.isPagination.set(true);
