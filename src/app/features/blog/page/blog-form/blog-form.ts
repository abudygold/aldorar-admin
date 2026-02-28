import { NgTemplateOutlet } from '@angular/common';
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
import { BaseForm } from '../../../../core/common';
import { CKEDITOR_CONFIG } from '../../../../shared/constant/ckeditor';
import {
	BLOG_DEFAULT_STATE,
	BLOG_EDIT_STATE,
	BLOG_SCHEMA_FORM,
	IBlogReq,
} from '../../../../shared/constant/formly';
import { BLOG_URL, CATEGORIES_URL } from '../../../../shared/constant/global';
import { IHttpResponse } from '../../../../shared/interface/base';

@Component({
	selector: 'app-blog-form',
	imports: [
		NgTemplateOutlet,
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
export class BlogForm extends BaseForm<IBlogReq> implements AfterViewInit {
	articleId = signal<string>('');
	selectedFile = signal<File | null>(null);
	opt = {
		category: signal<any[]>([]),
	};

	faIcon = {
		faPaperclip,
	};

	constructor() {
		super(BLOG_DEFAULT_STATE, (schemaPath) => BLOG_SCHEMA_FORM(schemaPath));

		this.id.set(this.activatedRoute.snapshot.paramMap.get('id') || null);

		this.getOptionService();
		this.id() &&
			this.getDetailService(BLOG_URL, BLOG_EDIT_STATE, (res) => {
				this.initEditor();
				this.articleId.set(res?.data?.id);
			});
	}

	ngAfterViewInit(): void {
		!this.id() && this.initEditor();
	}

	initEditor(): void {
		ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
			...CKEDITOR_CONFIG,
		}).then((editor: ClassicEditor) => {
			editor.setData(this.formModel().content);
			editor.model.document.on('change:data', () => {
				const data = editor.getData();
				this.formData.content().value.update((_) => data);
			});
		});
	}

	getOptionService(): void {
		this.api.get<IHttpResponse>(`${CATEGORIES_URL}/findByCode?code=BLOG`).subscribe({
			next: (res) => this.opt.category.set(res?.data || []),
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

	handleSubmit(): void {
		const formData = new FormData();
		for (const key in this.formData().value()) {
			if (this.formData().value().hasOwnProperty(key)) {
				const value = this.formData().value()[key as keyof IBlogReq];
				formData.append(key, value as any);
			}
		}

		if (this.selectedFile()) formData.append('cover', this.selectedFile()!);

		this.sendToApi(
			BLOG_URL,
			formData,
			{
				articleId: this.articleId(),
			},
			() => this.goBackToList(),
		);
	}

	goBackToList(): void {
		this.route.navigate(['/secure/blog']);
	}
}
