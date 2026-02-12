import { environment } from '../../../environments/environment';

/* USERS */
export const LOGIN_URL = `${environment.api.baseUrl}auth/login`;
export const LOGOUT_URL = `${environment.api.baseUrl}auth/logout`;

/* Upload */
export const UPLOAD_URL = `${environment.api.baseUrl}upload`;

/* BLOG */
export const BLOG_URL = `${environment.api.baseUrl}blog`;

/* CATEGORIES */
export const CATEGORIES_URL = `${environment.api.baseUrl}categories`;

/* PACKAGES */
export const PACKAGE_URL = `${environment.api.baseUrl}package`;

/* PACKAGE PRICE */
export const PACKAGE_PRICE_URL = `${environment.api.baseUrl}price`;

/* PACKAGE TRANSACTION */
export const PACKAGE_TRANSACTION_URL = `${environment.api.baseUrl}transaction`;

/* PACKAGE PARTICIPANT */
export const PACKAGE_PARTICIPANT_URL = `${environment.api.baseUrl}participant`;
