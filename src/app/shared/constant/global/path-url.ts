import { environment } from '../../../../environments/environment';

/* USERS */
export const LOGIN_URL = `${environment.api.baseUrl}auth/login`;
export const LOGOUT_URL = `${environment.api.baseUrl}auth/logout`;

/* UPLOAD */
export const UPLOAD_URL = `${environment.api.baseUrl}upload`;

/* BLOG */
export const BLOG_URL = `${environment.api.baseUrl}blog`;

/* CATEGORIES */
export const CATEGORIES_URL = `${environment.api.baseUrl}categories`;

/* PACKAGES */
export const PACKAGE_URL = `${environment.api.baseUrl}package`;

/* TRAVELER */
export const TRAVELER_URL = `${environment.api.baseUrl}traveler`;

/* TRANSACTION */
export const TRANSACTION_URL = `${environment.api.baseUrl}transaction`;

/* PAYMENT */
export const PAYMENT_URL = `${environment.api.baseUrl}payment`;

/* DOCUMENT */
export const DOCUMENT_URL = `${environment.api.baseUrl}traveler-documents`;
