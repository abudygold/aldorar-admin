import {
	faAddressCard,
	faBook,
	faDashboard,
	faFile,
	faLayerGroup,
	faMoneyBillTransfer,
	faNewspaper,
	faSuitcase,
} from '@fortawesome/free-solid-svg-icons';

export interface NavItem {
	label: string;
	icon?: any;
	url?: string; // External link
	path?: string; // Internal router link
	submenu?: NavItem[]; // Nested navigation
	hidden?: boolean; // Optional visibility control
	roles?: string[]; // Optional role-based access
}

export const NAVIGATION_MENU: NavItem[] = [
	{
		label: 'pages.dashboard.label',
		icon: faDashboard,
		path: '/',
	},
	{
		label: 'pages.myAccount.label',
		icon: faAddressCard,
		path: 'secure/profile',
	},
	{
		label: 'pages.package.label',
		icon: faSuitcase,
		path: 'secure/package',
	},
	{
		label: 'pages.travelers.label',
		icon: faAddressCard,
		path: 'secure/traveler',
	},
	{
		label: 'pages.transaction.label',
		icon: faBook,
		path: 'secure/transaction',
	},
	{
		label: 'pages.payment.label',
		icon: faMoneyBillTransfer,
		path: 'secure/payment',
	},
	{
		label: 'pages.document.label',
		icon: faFile,
		path: 'secure/document',
	},
	{
		label: 'pages.blog.label',
		icon: faNewspaper,
		path: 'secure/blog',
	},
	{
		label: 'pages.category.label',
		icon: faLayerGroup,
		path: 'secure/categories',
	},
];
