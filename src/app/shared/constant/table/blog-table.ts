import { TableModel } from '@devkitify/angular-ui-kit';

export const CUSTOM_TYPE_BLOG = {
	createdAt: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	isPublish: {
		type: 'custom',
	},
	actions: {
		type: 'custom',
	},
};

export const BLOG_TABLE: TableModel = new TableModel();
BLOG_TABLE.columns = [
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
		key: 'authorName',
		label: 'Author',
		sortable: true,
	},
	{
		key: 'isPublish',
		label: 'Publish',
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
BLOG_TABLE.isServerSide.set(true);
BLOG_TABLE.isPagination.set(true);
