export interface IBlogForm {
	id?: string;
	title: string;
	content: string;
	shortContent: string;
	categoryId: string;
	thumbnailUrl: string;
	isPublish: boolean;
}

export const BLOG_STATE_DEFAULT = {
	id: '',
	title: '',
	content: '',
	shortContent: '',
	categoryId: '',
	thumbnailUrl: '',
	isPublish: false,
};
