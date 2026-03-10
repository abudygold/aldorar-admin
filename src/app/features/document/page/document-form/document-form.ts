import { Component, signal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Button, ButtonModel, Dropdown, Textarea } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { BaseForm } from '../../../../core/common';
import { SanitizeUrlPipe } from '../../../../core/pipes/sanitize-url.pipe';
import { CANCEL_BUTTON, SAVE_BUTTON } from '../../../../shared/constant/button';
import {
	DOC_STATUS_OPTIONS,
	DOC_TYPE,
	DOCUMENT_DEFAULT_STATE,
	DOCUMENT_EDIT_STATE,
	DOCUMENT_SCHEMA_FORM,
	IDocument,
	IDocumentForm,
} from '../../../../shared/constant/formly';
import { DOCUMENT_URL } from '../../../../shared/constant/global';
import { IOptionList } from '../../../../shared/interface/base';

@Component({
	selector: 'app-document-form',
	imports: [
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatExpansionModule,
		Textarea,
		Dropdown,
		Button,
		FontAwesomeModule,
		SanitizeUrlPipe,
	],
	templateUrl: './document-form.html',
	styleUrl: './document-form.css',
})
export class DocumentForm extends BaseForm<IDocumentForm> {
	opt = {
		status: signal<IOptionList[]>(DOC_STATUS_OPTIONS),
	};
	btn = {
		save: signal<ButtonModel>(SAVE_BUTTON('Submit', () => this.handleSubmit())),
		cancel: signal<ButtonModel>(CANCEL_BUTTON('Cancel', () => this.goBackToList())),
	};

	faIcon = {
		faPaperclip,
	};

	constructor() {
		super(DOCUMENT_DEFAULT_STATE, (schemaPath) => DOCUMENT_SCHEMA_FORM(schemaPath));
		this.id() && this.getDetailService(DOCUMENT_URL, DOCUMENT_EDIT_STATE);
	}

	onFileSelected(event: Event, field: FieldTree<IDocument, number>): void {
		const input = event.target as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			field.file().value.set(input.files![0]);
			return;
		}

		field.file().value.set(null);
	}

	displayWithLabel(docType: DOC_TYPE): string {
		switch (docType) {
			case 'passport':
				return 'Passport';
			case 'ktp':
				return 'KTP';
			case 'photo':
				return 'Photo';
			case 'vaccine_certificate':
				return 'Vaccine Certificate';
			case 'family_card':
				return 'Family Card';
			default:
				return '';
		}
	}

	handleSubmit(): void {
		const [...documents] = this.formModel().documents;
		const formData = new FormData();
		let fileIndex: number = 0;

		documents.forEach((document: IDocument) => {
			if (!document.file) return;

			document.fileIndex = fileIndex;
			formData.append('files', document.file);
			fileIndex++;
		});

		formData.append('documents', JSON.stringify(documents));

		this.btn.save().disabled?.update((_) => true);
		this.btn.cancel().disabled?.update((_) => true);

		this.sendToApi(
			DOCUMENT_URL,
			formData,
			{},
			() => this.goBackToList(),
			() => {
				this.btn.save().disabled?.update((_) => false);
				this.btn.cancel().disabled?.update((_) => false);
			},
		);
	}

	goBackToList(): void {
		this.route.navigate(['/secure/document']);
	}
}
