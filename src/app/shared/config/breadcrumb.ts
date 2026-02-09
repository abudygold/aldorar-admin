import { BreadcrumbModel } from '@devkitify/angular-ui-kit';

/* DASHBOARD MENU */
const DASHBOARD_LINK: BreadcrumbModel = { label: 'Dashboard', url: '/secure' };
export const DASHBOARD_BREADCRUMB: BreadcrumbModel[] = [{ label: 'Dashboard' }];

/* BLOG MENU */
export const BLOG_CATEGORY_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'menus.contentManagement.blogCategories' },
];

export const BLOG_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'menus.contentManagement.blog' },
];

export const BLOG_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'menus.contentManagement.addBlog' },
];

export const BLOG_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'menus.contentManagement.editBlog' },
];
