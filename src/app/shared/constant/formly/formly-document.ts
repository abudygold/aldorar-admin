import { applyEach, PathKind, SchemaPathTree } from '@angular/forms/signals';
import { IOptionList } from '../../interface/base';

export type DOC_TYPE = 'passport' | 'ktp' | 'vaccine_certificate' | 'photo' | 'family_card';
export type DOC_STATUS = 'pending' | 'verified' | 'rejected' | 'need_revision';

export const DOC_STATUS_OPTIONS: IOptionList[] = [
	{ label: 'Pending', value: 'pending' },
	{ label: 'Verified', value: 'verified' },
	{ label: 'Rejected', value: 'rejected' },
	{ label: 'Need Revision', value: 'need_revision' },
];

export interface IDocument {
	tripTravelerId: string;
	documentType: DOC_TYPE;
	status: DOC_STATUS;
	file: File | null;
	fileUrl: string;
	fileIndex: number;
	note: string;
	verifiedAt?: Date;
	verifiedBy?: string;
}

export interface IDocumentForm {
	documents: IDocument[];
}

export const DOCUMENT_DEFAULT_STATE: IDocumentForm = {
	documents: [],
};

export const DOCUMENT_EDIT_STATE = (data: any) => ({
	documents: ['passport', 'ktp', 'vaccine_certificate', 'photo', 'family_card'].map(
		(docType: string, index: number) => {
			if (data?.documents) {
				const doc = data?.documents.find((t: IDocument) => t.documentType === docType);

				if (doc) {
					return {
						tripTravelerId: data.id,
						documentType: docType,
						status: doc.status,
						fileUrl: doc.fileUrl,
						note: doc.note,
						fileIndex: -1,
						file: null,
					} as IDocument;
				}
			}

			return {
				tripTravelerId: data.id,
				documentType: docType,
				status: 'pending',
				fileUrl: '',
				note: '',
				fileIndex: -1,
				file: null,
			} as IDocument;
		},
	),
});

export const DOCUMENT_SCHEMA_FORM = (schemaPath: SchemaPathTree<IDocumentForm, PathKind.Root>) => {
	applyEach(schemaPath.documents, (_) => {});
};
