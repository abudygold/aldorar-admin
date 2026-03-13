import { Component } from '@angular/core';
import { Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { BaseTable } from '../../../../core/common';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { DOCUMENT_URL } from '../../../../shared/constant/global';
import { CUSTOM_TYPE_DOCUMENT, DOCUMENT_TABLE } from '../../../../shared/constant/table';

@Component({
	selector: 'app-document-list',
	imports: [Table, StatusBadge, FontAwesomeModule],
	templateUrl: './document-list.html',
	styleUrl: './document-list.css',
})
export class DocumentList extends BaseTable {
	constructor() {
		super(DOCUMENT_URL, DOCUMENT_TABLE, CUSTOM_TYPE_DOCUMENT);
		this.addExtraIcons({
			faCircleCheck,
			faCircleXmark,
		});
	}

	getDocumentStatus(documents: any[], key: string): string {
		return documents.find((t: any) => t.documentType === key)?.status || 'pending';
	}
}
