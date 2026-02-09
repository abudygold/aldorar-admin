import { AfterViewInit, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { ClassicEditor } from 'ckeditor5';
import { BaseAlert, DEFAULT_MESSAGE_CREATE, DEFAULT_MESSAGE_UPDATE } from '../../../../core/common';
import { MatSelectInfiniteScrollDirective } from '../../../../core/directive';
import { API } from '../../../../core/services';
import { BLOG_URL, CATEGORIES_URL, CKEDITOR_CONFIG } from '../../../../shared/config';
import { BLOG_STATE_DEFAULT, IBlogForm } from '../../../../shared/forms';
import { IHttpResponse } from '../../../../shared/interface/base/http-response';

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
		MatSelectInfiniteScrollDirective,
	],
	templateUrl: './blog-form.html',
	styleUrl: './blog-form.css',
	encapsulation: ViewEncapsulation.None,
})
export class BlogForm implements AfterViewInit {
	#route = inject(Router);
	#activatedRoute = inject(ActivatedRoute);
	#api = inject(API);

	formModel = signal<IBlogForm>(BLOG_STATE_DEFAULT);
	formData = form(this.formModel, (schemaPath) => {
		required(schemaPath.title, { message: 'Title is required' });
		required(schemaPath.content, { message: 'Konten is required' });
		required(schemaPath.shortContent, { message: 'Konten Singkat is required' });
		required(schemaPath.categoryId, { message: 'Kategori is required' });
	});

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
		this.getCategoryOptionService();
		this.formModel.update((formModel) => ({
			...formModel,
			id: this.#activatedRoute.snapshot.paramMap.get('id') || '',
		}));

		this.formModel().id && this.getBlogDetailService();
	}

	ngAfterViewInit(): void {
		!this.formModel().id && this.initEditor();
	}

	initEditor(): void {
		ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
			...CKEDITOR_CONFIG,
		}).then((editor: ClassicEditor) => editor.setData(this.formModel().content));
	}

	getBlogDetailService(): void {
		this.#api
			.get<IHttpResponse>(`${BLOG_URL}/${this.#activatedRoute.snapshot.params['id']}`)
			.subscribe({
				next: (res) => {
					this.formModel.update((form) => ({
						...form,
						...{
							...res?.data,
							categoryId: res?.data?.category?.id,
						},
						/* ...{
							id: res?.data?.id,
							title: res?.data?.title,
							content: res?.data?.content,
							shortContent: res?.data?.shortContent,
							categoryId: res?.data?.category?.id,
							thumbnailUrl: res?.data?.thumbnailUrl,
							isPublish: res?.data.isPublish,
						}, */
					}));
					console.log(this.formModel());
					/* this.opt.category.update((category: any[]) => [
						...category,
						...[res?.data?.category],
					]); */
					this.initEditor();
				},
			});
	}

	getCategoryOptionService(): void {
		this.#api
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

	/* async loadNextPage() {
		if (this.allLoaded()) return;

		this.opt.categoryPage.update((page: number) => page + 1);
		this.getCategoryOptionService();
	} */

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

	onSubmit(): void {
		submit(this.formData, async () => this.blogService());
	}

	blogService(): void {
		const formData = new FormData();

		for (const key in this.formData().value()) {
			if (this.formData().value().hasOwnProperty(key)) {
				const value = this.formData().value()[key as keyof IBlogForm];
				formData.append(key, value as any);
			}
		}

		if (this.selectedFile()) formData.append('cover', this.selectedFile()!);

		const URI = `${BLOG_URL}${this.formModel().id ? `/${this.formModel().id}` : ''}`;

		this.#api[this.formModel().id ? 'put' : 'post']<IHttpResponse>(URI, formData).subscribe({
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
		this.#route.navigate(['/secure/blog']);
	}
}
