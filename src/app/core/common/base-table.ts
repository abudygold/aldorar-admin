import { inject, signal } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModel, TableModel } from '@devkitify/angular-ui-kit';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IHttpResponse } from '../../shared/interface/base';
import { API } from '../services';
import { BaseAlert, DEFAULT_MESSAGE_DELETE } from './base-sweetalert';

export class BaseTable {
	api = inject(API);
	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);

	button = {
		addNew: signal<ButtonModel>(new ButtonModel()),
	};

	faIcon = {
		faEdit,
		faTrash,
	};

	endpoint!: string;
	tableModel!: TableModel;
	customType!: object | null;

	constructor(
		endpoint: string,
		tableModel: TableModel,
		customType: object = {},
		addButton: ButtonModel = new ButtonModel(),
	) {
		this.endpoint = endpoint;
		this.tableModel = tableModel;
		this.customType = customType;
		this.button.addNew.set(addButton);

		this.fetchData();
	}

	fetchData(): void {
		this.tableModel.isLoading.set(true);

		this.api.get<IHttpResponse>(this.endpoint).subscribe({
			next: (res) => {
				this.tableModel.dataSource = res?.data?.rows || [];
				this.tableModel.dataTotal = res?.data?.pagination?.total || 0;
				this.tableModel.generateDataType();
			},
			complete: () => {
				if (this.customType)
					this.tableModel.dataType = {
						...this.tableModel.dataType,
						...this.customType,
					};

				this.tableModel.isLoading.set(false);
			},
			error: () => this.tableModel.isLoading.set(false),
		});
	}

	deleteService(id: string): void {
		this.api.delete<IHttpResponse>(`${this.endpoint}/${id}`).subscribe({
			next: (res) => {
				BaseAlert('Deleted!', res?.msg || DEFAULT_MESSAGE_DELETE, 'success');
				this.fetchData();
			},
		});
	}

	onRowSelection(row: any): void {
		this.tableModel.selectRow(row);
	}

	onAllSelection(isChecked: boolean): void {
		this.tableModel.selectAll(isChecked);
	}

	sortChange(event: Sort): void {
		this.tableModel.sortActive = event.active;
		this.tableModel.sortDirection = event.direction;
	}

	pageChange(event: any): void {
		this.tableModel.pageIndex = event.pageIndex;
		this.tableModel.pageSize = event.pageSize;
		this.fetchData();
	}
}
