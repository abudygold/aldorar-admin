import { BreadcrumbModel } from '@devkitify/angular-ui-kit';

/* DASHBOARD MENU */
const DASHBOARD_LINK: BreadcrumbModel = { label: 'Dashboard', url: '/secure' };
export const DASHBOARD_BREADCRUMB: BreadcrumbModel[] = [{ label: 'Dashboard' }];

/* CATEGORY MENU */
export const CATEGORY_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.category.label' },
];

/* BLOG MENU */
export const BLOG_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.blog.label' },
];

export const BLOG_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.blog.add.label' },
];

export const BLOG_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.blog.edit.label' },
];

/* PACKAGE MENU */
export const PACKAGE_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.package.label' },
];

export const PACKAGE_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.package.add.label' },
];

export const PACKAGE_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.package.edit.label' },
];

/* TRAVELER MENU */
export const TRAVELER_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.travelers.label' },
];

export const TRAVELER_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.travelers.add.label' },
];

export const TRAVELER_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.travelers.edit.label' },
];

/* TRANSACTION MENU */
export const TRANSACTION_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.transaction.label' },
];

export const TRANSACTION_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.transaction.add.label' },
];

export const TRANSACTION_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.transaction.edit.label' },
];

/* PAYMENT MENU */
export const PAYMENT_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.payment.label' },
];
