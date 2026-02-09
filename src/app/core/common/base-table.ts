import { inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableModel } from '@devkitify/angular-ui-kit';
import { IHttpResponse } from '../../shared/interface/base/http-response';
import { API } from '../services';

export class BaseTable {
	api = inject(API);

	endpoint!: string;
	tableModel!: TableModel;
	customType!: object | null;

	constructor(tableModel: TableModel, endpoint: string, customType?: object) {
		this.endpoint = endpoint;
		this.tableModel = tableModel;
		this.customType = customType || null;

		this.fetchData();
	}

	fetchData(): void {
		this.tableModel.isLoading.set(true);

		this.api.get<IHttpResponse>(this.endpoint).subscribe({
			next: (res) => {
				this.tableModel.dataSource = res?.data?.rows || [];
				this.tableModel.dataTotal = res?.data?.pagination?.total || 0;
				this.tableModel.isLoading.set(false);
				this.tableModel.generateDataType();
			},
			complete: () => {
				if (this.customType)
					this.tableModel.dataType = {
						...this.tableModel.dataType,
						...this.customType,
					};
			},
			error: () => this.tableModel.isLoading.set(false),
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
