import { BreadcrumbModel } from '@devkitify/angular-ui-kit';

/* DASHBOARD MENU */
const DASHBOARD_LINK: BreadcrumbModel = { label: 'Dashboard', url: '/secure' };
export const DASHBOARD_BREADCRUMB: BreadcrumbModel[] = [{ label: 'Dashboard' }];

/* BLOG MENU */
export const BLOG_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.content.blog.label' },
];

export const BLOG_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.content.blog.add.label' },
];

export const BLOG_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.content.blog.edit.label' },
];

/* BLOG CATEGORY MENU */
export const BLOG_CATEGORY_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.content.category.label' },
];

/* PACKAGE MENU */
export const PACKAGE_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.package.label' },
];

export const PACKAGE_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.package.add.label' },
];

export const PACKAGE_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.package.edit.label' },
];

/* PACKAGE PRICE MENU */
export const PACKAGE_PRICE_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.price.label' },
];

/* PACKAGE TRANSACTION MENU */
export const PACKAGE_TRANSACTION_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.transaction.label' },
];

export const PACKAGE_TRANSACTION_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.transaction.add.label' },
];

export const PACKAGE_TRANSACTION_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.transaction.edit.label' },
];

/* PACKAGE PARTICIPANT MENU */
export const PACKAGE_PARTICIPANT_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.participant.label' },
];

export const PACKAGE_PARTICIPANT_ADD_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.participant.add.label' },
];

export const PACKAGE_PARTICIPANT_EDIT_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.participant.edit.label' },
];

/* PACKAGE PAYMENT MENU */
export const PACKAGE_PAYMENT_LIST_BREADCRUMB: BreadcrumbModel[] = [
	DASHBOARD_LINK,
	{ label: 'pages.administrative.payment.label' },
];
