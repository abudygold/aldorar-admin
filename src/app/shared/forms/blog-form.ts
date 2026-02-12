import { PathKind, required, SchemaPathTree } from '@angular/forms/signals';

export interface IBlogForm {
	id?: string;
	title: string;
	content: string;
	shortContent: string;
	categoryId: string;
	thumbnailUrl: string;
	isPublish: boolean;
}

export const STATE_DEFAULT_BLOG = {
	id: '',
	title: '',
	content: '',
	shortContent: '',
	categoryId: '',
	thumbnailUrl: '',
	isPublish: false,
};

export const STATE_EDIT_BLOG = (data: any) => ({
	id: data?.id || '',
	title: data?.title || '',
	content: data?.content || '',
	shortContent: data?.shortContent || '',
	categoryId: data?.category?.id || '',
	thumbnailUrl: data?.thumbnailUrl || '',
	isPublish: data.isPublish || '',
});

export const FORM_SCHEMA_BLOG = (schemaPath: SchemaPathTree<IBlogForm, PathKind.Root>) => {
	required(schemaPath.title, { message: 'Title is required' });
	required(schemaPath.content, { message: 'Konten is required' });
	required(schemaPath.shortContent, { message: 'Konten Singkat is required' });
	required(schemaPath.categoryId, { message: 'Kategori is required' });
};
