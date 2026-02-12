import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Button, Table } from '@devkitify/angular-ui-kit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseTable } from '../../../../core/common';
import { BLOG_URL, PACKAGE_PRICE_URL } from '../../../../shared/config';
import { CREATE_BUTTON } from '../../../../shared/config/button';
import { BLOG_CUSTOM_TYPE, BLOG_TABLE } from '../../../../shared/config/table';

@Component({
  selector: 'app-package-price-list',
	imports: [MatCheckboxModule, FontAwesomeModule, Table, Button],
  templateUrl: './package-price-list.html',
  styleUrl: './package-price-list.css',
})
export class PackagePriceList extends BaseTable {
  constructor() {
    super(
      PACKAGE_PRICE_URL,
      BLOG_TABLE,
      BLOG_CUSTOM_TYPE,
      CREATE_BUTTON('Add Blog', () => this.navigateToPage(['./add'])),
    );
  }

  onAction(action: 'edit' | 'delete', data?: any): void {
    switch (action) {
      case 'edit':
        this.navigateToPage(['./edit', data?.slug]);
        break;

      case 'delete':
        this.deleteService(data?.id);
        break;
    }
  }

  navigateToPage(page: string[]): void {
    this.router.navigate(page, {
      relativeTo: this.activatedRoute,
    });
  }
}
