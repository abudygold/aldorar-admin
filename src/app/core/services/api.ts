import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { generateHttpHeader, generateHttpParams } from './utils';

@Injectable({
	providedIn: 'root',
})
export class API {
	#http = inject(HttpClient);
	#destroyRef = inject(DestroyRef);

	get<T>(url: string, paramsReq: any = {}, headersReq: any = {}): Observable<T> {
		const params = generateHttpParams(paramsReq);
		const headers = generateHttpHeader(headersReq);

		return this.#http
			.get<T>(url, { params, headers })
			.pipe(takeUntilDestroyed(this.#destroyRef));
	}

	post<T>(url: string, body: any, headersReq?: any): Observable<T> {
		const headers = headersReq ? generateHttpHeader(headersReq) : {};

		return this.#http
			.post<T>(url, body, { headers })
			.pipe(takeUntilDestroyed(this.#destroyRef));
	}

	put<T>(url: string, body: any, headersReq?: any): Observable<T> {
		const headers = headersReq ? generateHttpHeader(headersReq) : {};

		return this.#http.put<T>(url, body, { headers }).pipe(takeUntilDestroyed(this.#destroyRef));
	}

	patch<T>(url: string, body: any, headersReq?: any): Observable<T> {
		const headers = headersReq ? generateHttpHeader(headersReq) : {};

		return this.#http
			.patch<T>(url, body, { headers })
			.pipe(takeUntilDestroyed(this.#destroyRef));
	}

	delete<T>(url: string, paramsReq: any = {}, headersReq: any = {}): Observable<T> {
		const params = generateHttpParams(paramsReq);
		const headers = generateHttpHeader(headersReq);

		return this.#http
			.delete<T>(url, { params, headers })
			.pipe(takeUntilDestroyed(this.#destroyRef));
	}
}
