import { TableModel } from '@devkitify/angular-ui-kit';

export const BLOG_CUSTOM_TYPE = {
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

export const BLOG_TABLE: TableModel = new TableModel();
BLOG_TABLE.columns = [
	{
		key: 'selection',
		label: '',
		sortable: false,
	},
	{
		key: 'title',
		label: 'Title',
		sortable: true,
	},
	{
		key: 'category',
		label: 'Category',
		sortable: true,
	},
	{
		key: 'author',
		label: 'Author',
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
BLOG_TABLE.sortActive = 'title';
BLOG_TABLE.sortDirection = 'asc';
BLOG_TABLE.isHttpPagination.set(true);
BLOG_TABLE.isPagination.set(true);
