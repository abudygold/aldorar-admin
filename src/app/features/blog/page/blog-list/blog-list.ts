import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseTable } from '../../../../core/common';
import { BLOG_URL } from '../../../../shared/constant/global';
import { BLOG_TABLE, CUSTOM_TYPE_BLOG } from '../../../../shared/constant/table';

@Component({
	selector: 'app-blog-list',
	imports: [FormsModule, FontAwesomeModule, MatSlideToggleModule, Table, Button],
	templateUrl: './blog-list.html',
	styleUrl: './blog-list.css',
})
export class BlogList extends BaseTable {
	constructor() {
		super(BLOG_URL, BLOG_TABLE, CUSTOM_TYPE_BLOG);
		this.initAddButton('Add Blog', () => this.navigateToPage(['./add']));
	}

	updateBlogStatus(slug: number, isPublish: boolean): void {
		this.api.put(`${BLOG_URL}/${slug}`, { isPublish }).subscribe(() => this.fetchData());
	}
}
