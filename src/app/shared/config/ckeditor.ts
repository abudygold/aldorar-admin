import {
	Alignment,
	BlockQuote,
	Bold,
	EditorConfig,
	Essentials,
	FindAndReplace,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	HorizontalLine,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	SimpleUploadAdapter,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	TodoList,
	Underline,
	Undo,
} from 'ckeditor5';
import { UPLOAD_URL } from './path-url';

export const CKEDITOR_CONFIG: EditorConfig = {
	licenseKey: 'GPL',
	fontFamily: {
		options: [
			'Inter',
			'Arial, Helvetica, sans-serif',
			'Courier New, Courier, monospace',
			'Georgia, serif',
			'Lucida Sans Unicode, Lucida Grande, sans-serif',
			'Tahoma, Geneva, sans-serif',
			'Times New Roman, Times, serif',
			'Trebuchet MS, Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',
		],
	},
	fontColor: {
		columns: 3,
		colors: [
			{
				color: '#0f6b4d',
				label: 'Primary',
			},
			{
				color: '#b08441',
				label: 'Secondary',
			},
			{
				color: '#ba1a1a',
				label: 'Danger',
			},
			{
				color: '#000000',
				label: 'Black',
			},
			{
				color: '#d9d9d9',
				label: 'Light Gray',
			},
		],
	},
	fontSize: {
		options: [9, 10, 11, 'default', 14, 16, 18, 22, 24],
	},
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
			{ model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
			{ model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
			{ model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
		],
	},
	simpleUpload: {
		uploadUrl: UPLOAD_URL,
		withCredentials: true,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('aldorar.access_token')}`,
		},
	},
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',

			'heading',
			'|',

			'fontFamily',
			'fontSize',
			'fontColor',
			'|',

			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'|',

			'alignment',
			'|',

			'link',
			'blockQuote',
			'horizontalLine',
			'|',

			'bulletedList',
			'numberedList',
			'todoList',
			'|',

			'indent',
			'outdent',
			'|',

			'insertTable',
			'imageUpload',
			'mediaEmbed',
			'|',

			'findAndReplace',
			'highlight',
		],
		shouldNotGroupWhenFull: true,
	},
	plugins: [
		Essentials,
		Paragraph,
		Heading,

		Bold,
		Italic,
		Underline,
		Strikethrough,
		Subscript,
		Superscript,

		FontFamily,
		FontSize,
		FontColor,

		Alignment,

		Link,
		BlockQuote,
		HorizontalLine,

		List,
		TodoList,
		Indent,
		IndentBlock,

		Table,
		TableToolbar,
		TableProperties,
		TableCellProperties,

		Image,
		ImageCaption,
		ImageStyle,
		ImageResize,
		ImageUpload,
		SimpleUploadAdapter,

		MediaEmbed,

		FindAndReplace,
		Highlight,

		Undo,
	],
};
