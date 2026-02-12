import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseTable, ConfirmAlert } from '../../../../core/common';
import { CATEGORIES_URL } from '../../../../shared/config';
import { CREATE_BUTTON } from '../../../../shared/config/button';
import { BLOG_CATEGORY_CUSTOM_TYPE, BLOG_CATEGORY_TABLE } from '../../../../shared/config/table';
import { BlogCategoryForm } from '../../dialog/blog-category-form';

@Component({
	selector: 'app-blog-category-list',
	imports: [MatCheckboxModule, FontAwesomeModule, Table, Button],
	templateUrl: './blog-category-list.html',
	styleUrl: './blog-category-list.css',
})
export class BlogCategoryList extends BaseTable {
	#dialog = inject(MatDialog);

	constructor() {
		super(
			CATEGORIES_URL,
			BLOG_CATEGORY_TABLE,
			BLOG_CATEGORY_CUSTOM_TYPE,
			CREATE_BUTTON('Add Category', () => this.openFormDialog()),
		);
	}

	onAction(action: 'edit' | 'delete', data?: any): void {
		switch (action) {
			case 'edit':
				this.openFormDialog(data);
				break;

			case 'delete':
				ConfirmAlert().then((result) => {
					if (result.isConfirmed) this.deleteService(data?.id);
				});
				break;
		}
	}

	openFormDialog(data: any = null): void {
		this.#dialog
			.open(BlogCategoryForm, {
				width: '600px',
				data,
			})
			.afterClosed()
			.subscribe((isReload: boolean) => {
				if (!isReload) return;

				this.fetchData();
			});
	}
}
