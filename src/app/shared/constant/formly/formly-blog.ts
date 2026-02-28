import { PathKind, required, SchemaPathTree } from '@angular/forms/signals';

export interface IBlogReq {
	title: string;
	content: string;
	shortContent: string;
	categoryId: string;
	thumbnailUrl: string;
	isPublish: boolean;
}

export const BLOG_DEFAULT_STATE = {
	title: '',
	content: '',
	shortContent: '',
	categoryId: '',
	thumbnailUrl: '',
	isPublish: false,
};

export const BLOG_EDIT_STATE = (data: any) => ({
	title: data?.title || '',
	content: data?.content || '',
	shortContent: data?.shortContent || '',
	categoryId: data?.categoryId || '',
	thumbnailUrl: data?.thumbnailUrl || '',
	isPublish: data?.isPublish || false,
});

export const BLOG_SCHEMA_FORM = (schemaPath: SchemaPathTree<IBlogReq, PathKind.Root>) => {
	required(schemaPath.title, { message: 'Title is required' });
	required(schemaPath.content, { message: 'Konten is required' });
	required(schemaPath.shortContent, { message: 'Konten Singkat is required' });
	required(schemaPath.categoryId, { message: 'Kategori is required' });
};
