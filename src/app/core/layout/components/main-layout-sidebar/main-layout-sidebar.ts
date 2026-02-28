import { Component, inject, input, model, OnInit, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { NAVIGATION_MENU, NavItem } from '../../../navigation';

@Component({
	selector: 'app-main-layout-sidebar',
	imports: [MatListModule, TranslateModule, FontAwesomeModule],
	templateUrl: './main-layout-sidebar.html',
	styleUrl: './main-layout-sidebar.css',
})
export class MainLayoutSidebar implements OnInit {
	readonly router = inject(Router);

	toggleMenu = output<void>();

	expanded: Set<string> = new Set();
	currentUrl: string = '';
	faIcon = {
		faChevronDown,
		faChevronUp,
	};

	menu = input<NavItem[]>(NAVIGATION_MENU);
	isMobile = input<boolean>();
	snav = model<MatSidenav>();

	constructor() {
		this.router.events.subscribe(() => {
			this.currentUrl = this.router.url;
		});
	}

	ngOnInit() {
		this.currentUrl = this.router.url;
		this.#expandParentsWithActiveRoute(this.menu());
	}

	clickedMenu(item: NavItem): void {
		item.submenu ? this.toggle(item) : this.navigate(item);
	}

	toggle(item: NavItem) {
		if (!item.submenu) return;

		if (this.expanded.has(item.label)) {
			this.expanded.delete(item.label);
		} else {
			this.expanded.add(item.label);
		}
	}

	isExpanded(item: NavItem): boolean {
		return this.expanded.has(item.label);
	}

	navigate(item: NavItem) {
		if (item.path) {
			this.router.navigate([item.path]);
			this.toggleMenu.emit();
		}
		// if (item.url) window.open(item.url, '_blank');
	}

	/** Check if this menu item is active */
	isActive(item: NavItem): boolean {
		return item.path ? this.currentUrl === item.path : false;
	}

	/** Auto-expand parents if children contain active route */
	#expandParentsWithActiveRoute(items: NavItem[]) {
		items.forEach((item) => {
			if (item.submenu) {
				if (this.#containsActiveRoute(item.submenu)) {
					this.expanded.add(item.label);
				}
				this.#expandParentsWithActiveRoute(item.submenu);
			}
		});
	}

	#containsActiveRoute(items: NavItem[]): boolean {
		return items.some(
			(child) =>
				(child.path && this.currentUrl.startsWith(child.path)) ||
				(child.submenu && this.#containsActiveRoute(child.submenu)),
		);
	}
}
