import { HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';

class CustomEncoder implements HttpParameterCodec {
	encodeKey(key: string): string {
		return encodeURIComponent(key);
	}

	encodeValue(value: string): string {
		return encodeURIComponent(value);
	}

	decodeKey(key: string): string {
		return decodeURIComponent(key);
	}

	decodeValue(value: string): string {
		return decodeURIComponent(value);
	}
}

export const generateHttpParams = (params: any): HttpParams => {
	let httpParams = new HttpParams({ encoder: new CustomEncoder() });

	if (params) {
		Object.keys(params).forEach((key) => {
			if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
				httpParams = httpParams.set(key, params[key]);
			}
		});
	}

	return httpParams;
};

export const generateHttpHeader = (headers: any): HttpHeaders => {
	let httpHeaders = new HttpHeaders();

	if (headers) {
		Object.keys(headers).forEach((key) => {
			if (headers[key] !== null && headers[key] !== undefined && headers[key] !== '') {
				httpHeaders = httpHeaders.set(key, headers[key]);
			}
		});
	}

	return httpHeaders;
};
