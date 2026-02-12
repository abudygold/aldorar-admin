import {
	faAddressCard,
	faBook,
	faDashboard,
	faFolderTree,
	faLayerGroup,
	faMoneyBillTransfer,
	faNewspaper,
	faPeopleGroup,
	faSuitcase,
	faTags,
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
		path: '/',
	},
	{
		label: 'pages.administrative.label',
		icon: faFolderTree,
		submenu: [
			{
				label: 'pages.administrative.package.label',
				icon: faSuitcase,
				path: 'secure/package',
			},
			{
				label: 'pages.administrative.price.label',
				icon: faTags,
				path: 'secure/package/price',
			},
			{
				label: 'pages.administrative.participant.label',
				icon: faPeopleGroup,
				path: 'secure/package/participant',
			},
			{
				label: 'pages.administrative.transaction.label',
				icon: faBook,
				path: 'secure/package/transaction',
			},
			{
				label: 'pages.administrative.payment.label',
				icon: faMoneyBillTransfer,
				path: 'secure/package/payment',
			},
		],
	},
	{
		label: 'pages.content.label',
		icon: faFolderTree,
		submenu: [
			{
				label: 'pages.content.blog.label',
				icon: faNewspaper,
				path: 'secure/blog',
			},
			{
				label: 'pages.content.category.label',
				icon: faLayerGroup,
				path: 'secure/blog/categories',
			},
		],
	},
	/* {
		label: 'Pengaturan Web',
		icon: 'circleInfo',
		submenu: [
			{
				label: 'Blog',
				icon: 'chevronRight',
				path: '/package/umrah-package',
			},
			{
				label: 'Kategori',
				icon: 'chevronRight',
				path: '/package/umrah-private',
			},
		],
	}, */
];
