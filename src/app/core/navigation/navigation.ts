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
		label: 'menus.dashboard',
		icon: faDashboard,
		path: '/',
	},
	{
		label: 'menus.myAccount',
		icon: faAddressCard,
		path: '/',
	},
	{
		label: 'menus.administrativeManagement.label',
		icon: faFolderTree,
		submenu: [
			{
				label: 'menus.administrativeManagement.package',
				icon: faSuitcase,
				path: 'secure/package',
			},
			{
				label: 'menus.administrativeManagement.price',
				icon: faTags,
				path: 'secure/package/price',
			},
			{
				label: 'menus.administrativeManagement.participant',
				icon: faPeopleGroup,
				path: 'secure/package/participant',
			},
			{
				label: 'menus.administrativeManagement.transaction',
				icon: faBook,
				path: 'secure/package/transaction',
			},
			{
				label: 'menus.administrativeManagement.payment',
				icon: faMoneyBillTransfer,
				path: 'secure/package/payment',
			},
		],
	},
	{
		label: 'menus.contentManagement.label',
		icon: faFolderTree,
		submenu: [
			{
				label: 'menus.contentManagement.blog',
				icon: faNewspaper,
				path: 'secure/blog',
			},
			{
				label: 'menus.contentManagement.blogCategories',
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
