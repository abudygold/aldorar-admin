import { TableModel } from '@devkitify/angular-ui-kit';

export const PACKAGE_CUSTOM_TYPE = {
	selection: {
		type: 'custom',
	},
	departureDate: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	returnDate: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	durationDays: {
		type: 'number',
	},
	quota: {
		type: 'number',
	},
	quotaUsed: {
		type: 'number',
	},
	createdAt: {
		type: 'date',
		format: 'dd MMM yyyy',
	},
	actions: {
		type: 'custom',
	},
};

export const PACKAGE_TABLE: TableModel = new TableModel();
PACKAGE_TABLE.columns = [
	{
		key: 'selection',
		label: '',
		sortable: false,
	},
	{
		key: 'title',
		label: 'Judul',
		sortable: true,
	},
	{
		key: 'tripType',
		label: 'Tipe',
		sortable: true,
	},
	{
		key: 'durationDays',
		label: 'Durasi',
		sortable: true,
	},
	{
		key: 'departureDate',
		label: 'Keberangkatan',
		sortable: true,
	},
	{
		key: 'returnDate',
		label: 'Kepulangan',
		sortable: true,
	},
	{
		key: 'quota',
		label: 'Kuota',
		sortable: true,
	},
	{
		key: 'quotaUsed',
		label: 'Kuota Terpakai',
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
PACKAGE_TABLE.sortActive = 'title';
PACKAGE_TABLE.sortDirection = 'asc';
PACKAGE_TABLE.isHttpPagination.set(true);
PACKAGE_TABLE.isPagination.set(true);

/* {
    "id": "7c337f10-5c18-4ca7-aef6-da07b6d4d076",
    "title": "Paket Regular",
    "slug": "paket-regular",
    "packageType": "umrah",
    "tripType": "regular",
    "durationDays": 9,
    "quota": 45,
    "quotaUsed": 0,
    "departureDate": "2026-02-14T17:00:00.000Z",
    "departureAirline": "Garuda",
    "departureFlightType": "direct",
    "departureLanding": "Jeddah",
    "returnDate": "2026-02-23T17:00:00.000Z",
    "returnAirline": "Garuda",
    "returnFlightType": "direct",
    "returnLanding": "Jakarta",
    "madinahHotelName": "Medina",
    "madinahHotelStar": 4,
    "mekkahHotelName": "Mecca",
    "mekkahHotelStar": 4,
    "isPlusThaif": true,
    "isHighSpeedTrain": true,
    "isPublish": false,
    "createdAt": "2026-02-11T19:25:43.340Z",
    "updatedAt": null,
    "deletedAt": null
} */
