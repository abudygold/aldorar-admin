import { Component, inject, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, ButtonModel, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseAlert, BaseTable, DEFAULT_MESSAGE_DELETE } from '../../../../core/common';
import { BLOG_URL } from '../../../../shared/config';
import { CREATE_BUTTON } from '../../../../shared/config/button';
import { BLOG_CUSTOM_TYPE, BLOG_TABLE } from '../../../../shared/config/table';
import { IHttpResponse } from '../../../../shared/interface/base/http-response';

@Component({
	selector: 'app-blog-list',
	imports: [MatCheckboxModule, FontAwesomeModule, Table, Button],
	templateUrl: './blog-list.html',
	styleUrl: './blog-list.css',
})
export class BlogList extends BaseTable {
	#router = inject(Router);
	#activatedRoute = inject(ActivatedRoute);

	button = {
		addNew: signal<ButtonModel>(
			CREATE_BUTTON('Add Blog', () => this.navigateToPage(['./add'])),
		),
	};

	faIcon = {
		faEdit,
		faTrash,
	};

	constructor() {
		super(BLOG_TABLE, BLOG_URL, BLOG_CUSTOM_TYPE);
	}

	onAction(action: 'edit' | 'delete', data?: any): void {
		switch (action) {
			case 'edit':
				this.navigateToPage(['./edit', data?.slug]);
				break;

			case 'delete':
				this.deleteService(data?.id);
				break;
		}
	}

	deleteService(id: string): void {
		this.api.delete<IHttpResponse>(`${BLOG_URL}/${id}`).subscribe({
			next: (res) => {
				BaseAlert('Deleted!', res?.msg || DEFAULT_MESSAGE_DELETE, 'success');
				this.fetchData();
			},
		});
	}

	navigateToPage(page: string[]): void {
		this.#router.navigate(page, {
			relativeTo: this.#activatedRoute,
		});
	}
}
