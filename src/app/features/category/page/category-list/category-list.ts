import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseTable } from '../../../../core/common';
import { CATEGORIES_URL } from '../../../../shared/constant/global';
import { CATEGORY_TABLE, CUSTOM_TYPE_CATEGORY } from '../../../../shared/constant/table';
import { CategoryForm } from '../../components/category-form';

@Component({
	selector: 'app-category-list',
	imports: [MatCheckboxModule, FontAwesomeModule, Table, Button],
	templateUrl: './category-list.html',
	styleUrl: './category-list.css',
})
export class CategoryList extends BaseTable {
	constructor() {
		super(CATEGORIES_URL, CATEGORY_TABLE, CUSTOM_TYPE_CATEGORY);
		this.initAddButton('Add Category', () => this.openFormDialog());
	}

	openFormDialog(data: any = null): void {
		this.dialog
			.open(CategoryForm, {
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
