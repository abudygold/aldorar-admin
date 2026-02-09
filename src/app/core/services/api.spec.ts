import { TestBed } from '@angular/core/testing';

import { API } from './api';

describe('Api', () => {
	let service: API;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(API);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
