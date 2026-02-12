import { AfterViewInit, Component, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ClassicEditor } from 'ckeditor5';
import {
	BaseAlert,
	BaseForm,
	DEFAULT_MESSAGE_CREATE,
	DEFAULT_MESSAGE_UPDATE,
} from '../../../../core/common';
import { BLOG_URL, CATEGORIES_URL, CKEDITOR_CONFIG } from '../../../../shared/config';
import {
	FORM_SCHEMA_BLOG,
	IBlogForm,
	STATE_DEFAULT_BLOG,
	STATE_EDIT_BLOG,
} from '../../../../shared/forms';
import { IHttpResponse } from '../../../../shared/interface/base';

@Component({
	selector: 'app-blog-form',
	imports: [
		FormField,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatSlideToggleModule,
		CKEditorModule,
		FontAwesomeModule,
		MatButtonModule,
	],
	templateUrl: './blog-form.html',
	styleUrl: './blog-form.css',
})
export class BlogForm extends BaseForm<IBlogForm> implements AfterViewInit {
	allLoaded = signal<boolean>(false);
	selectedFile = signal<File | null>(null);
	opt = {
		category: signal<any[]>([]),
		categoryPage: signal<number>(1),
	};

	faIcon = {
		faPaperclip,
	};

	constructor() {
		super(STATE_DEFAULT_BLOG, (schemaPath) => FORM_SCHEMA_BLOG(schemaPath));
		this.fnSubmit = this.onSubmitService;

		this.formModel.update((formModel) => ({
			...formModel,
			id: this.activatedRoute.snapshot.paramMap.get('id') || '',
		}));

		this.getCategoryOptionService();
		this.formModel().id && this.getDetailService();
	}

	ngAfterViewInit(): void {
		!this.formModel().id && this.initEditor();
	}

	initEditor(): void {
		ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
			...CKEDITOR_CONFIG,
		}).then((editor: ClassicEditor) => editor.setData(this.formModel().content));
	}

	getCategoryOptionService(): void {
		this.api
			.get<IHttpResponse>(`${CATEGORIES_URL}?page=${this.opt.categoryPage()}&limit=100`)
			.subscribe({
				next: (res) => {
					this.opt.category.update((category: any[]) => [
						...category,
						...res?.data?.rows,
					]);
					this.allLoaded.set(res?.data?.pagination?.total === this.opt.category().length);
				},
			});
	}

	getDetailService(): void {
		this.api
			.get<IHttpResponse>(`${BLOG_URL}/${this.activatedRoute.snapshot.params['id']}`)
			.subscribe({
				next: (res) => {
					this.initEditor();
					this.formModel.update((form) => ({
						...form,
						...STATE_EDIT_BLOG(res?.data),
					}));
				},
			});
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			this.selectedFile.set(input.files[0]);
			return;
		}

		this.selectedFile.set(null);
	}

	onContentChange(event: any): void {
		const data = event.editor.getData();
		this.formModel.update((form) => ({ ...form, ...{ content: data } }));
	}

	onSubmitService(): void {
		const formData = new FormData();
		for (const key in this.formData().value()) {
			if (this.formData().value().hasOwnProperty(key)) {
				const value = this.formData().value()[key as keyof IBlogForm];
				formData.append(key, value as any);
			}
		}

		if (this.selectedFile()) formData.append('cover', this.selectedFile()!);

		const bodyReq = { ...this.formModel() };
		const URI = `${BLOG_URL}${this.formModel().id ? `/${this.formModel().id}` : ''}`;

		delete bodyReq.id;

		this.api[this.formModel().id ? 'put' : 'post']<IHttpResponse>(URI, bodyReq).subscribe({
			next: (res) => {
				BaseAlert(
					'Success!',
					res?.msg ||
						(this.formModel().id ? DEFAULT_MESSAGE_CREATE : DEFAULT_MESSAGE_UPDATE),
					'success',
				);
				this.goBackToList();
			},
		});
	}

	goBackToList(): void {
		this.route.navigate(['/secure/blog']);
	}
}
