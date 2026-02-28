import { inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModel, TableModel } from '@devkitify/angular-ui-kit';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IHttpResponse } from '../../shared/interface/base';
import { API } from '../services';
import { BaseAlert, ConfirmAlert, DEFAULT_MESSAGE_DELETE } from './base-sweetalert';

export class BaseTable {
	api = inject(API);
	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);
	dialog = inject(MatDialog);

	button = {
		addNew: signal<ButtonModel>(new ButtonModel()),
	};

	faIcon: any = {
		faEdit,
		faTrash,
	};

	endpoint!: string;
	tableModel!: TableModel;
	customType!: object | null;

	constructor(endpoint: string, tableModel: TableModel, customType: object = {}) {
		this.endpoint = endpoint;
		this.tableModel = tableModel;
		this.customType = customType;

		this.fetchData();
	}

	initAddButton(text: string, onClick: () => void): void {
		this.button.addNew.set({
			text,
			icon: 'add',
			appearance: 'flat',
			onClick,
		});
	}

	addExtraIcons(extraIcons: any): void {
		this.faIcon = {
			...this.faIcon,
			...extraIcons,
		};
	}

	fetchData(): void {
		this.tableModel.isLoading.set(true);

		this.api
			.get<IHttpResponse>(this.endpoint, {
				page: this.tableModel.pageIndex + 1,
				limit: this.tableModel.pageSize,
				sort: this.tableModel.sortActive,
				order: this.tableModel.sortDirection,
			})
			.subscribe({
				next: (res) => {
					this.tableModel.dataSource = res?.data?.rows || [];
					this.tableModel.dataTotal = res?.data?.pagination?.total || 0;
					this.tableModel.pageIndex === 0 && this.tableModel.generateDataType();
				},
				complete: () => {
					if (this.tableModel.pageIndex === 0 && this.customType) {
						this.tableModel.dataType = {
							...this.tableModel.dataType,
							...this.customType,
						};
					}

					this.tableModel.isLoading.set(false);
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

	onAction(action: 'edit' | 'delete', id: string): void {
		switch (action) {
			case 'edit':
				this.navigateToPage(['./edit', id]);
				break;

			case 'delete':
				ConfirmAlert().then((result) => {
					result.isConfirmed && this.deleteService(id);
				});
				break;
		}
	}

	deleteService(id: string): void {
		this.api.delete<IHttpResponse>(`${this.endpoint}/${id}`).subscribe({
			next: (res) => {
				BaseAlert('Deleted!', res?.msg || DEFAULT_MESSAGE_DELETE, 'success');
				this.fetchData();
			},
		});
	}

	navigateToPage(page: string[]): void {
		this.router.navigate(page, {
			relativeTo: this.activatedRoute,
		});
	}
}
