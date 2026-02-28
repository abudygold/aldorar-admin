import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
	ActivatedRouteSnapshot,
	NavigationEnd,
	NavigationStart,
	Router,
	RouterOutlet,
} from '@angular/router';
import { Breadcrumb, BreadcrumbModel } from '@devkitify/angular-ui-kit';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { ITitle } from '../../../../shared/constant/global';
import { MainLayoutFooter } from '../../components/main-layout-footer';
import { MainLayoutHeader } from '../../components/main-layout-header';
import { MainLayoutSidebar } from '../../components/main-layout-sidebar';

@Component({
	selector: 'app-main-layout',
	imports: [
		RouterOutlet,
		NgClass,
		MatSidenavModule,
		MainLayoutSidebar,
		MainLayoutHeader,
		MainLayoutFooter,
		Breadcrumb,
	],
	templateUrl: './main-layout.html',
	styleUrl: './main-layout.css',
})
export class MainLayout {
	#router = inject(Router);
	#media = inject(MediaMatcher);
	#translate = inject(TranslateService);

	private readonly _mobileQuery: MediaQueryList;
	private readonly _mobileQueryListener: () => void;

	protected readonly isMobile = signal(true);

	breadcrumbs: BreadcrumbModel[] = [];
	heading: ITitle | null = null;
	isNavigating: boolean = false;

	routeData = toSignal(
		this.#router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => {
				const root = this.#router.routerState.root;
				this.buildBreadcrumbs(root.snapshot);
			}),
		),
		{
			initialValue: null,
		},
	);

	navigate = toSignal(
		this.#router.events.pipe(
			map((event) => {
				if (event instanceof NavigationStart) this.isNavigating = true;
				if (event instanceof NavigationEnd)
					setTimeout(() => (this.isNavigating = false), 300);
			}),
		),
		{
			initialValue: null,
		},
	);

	constructor() {
		this._mobileQuery = this.#media.matchMedia('(max-width: 600px)');
		this.isMobile.set(this._mobileQuery.matches);
		this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
		this._mobileQuery.addEventListener('change', this._mobileQueryListener);
	}

	buildBreadcrumbs(route: ActivatedRouteSnapshot | null): void {
		if (!route) return;

		this.heading = route.data['title'] || '';
		this.breadcrumbs = route.data['breadcrumb'] || '';

		if (this.heading)
			this.#translate.stream(this.heading?.title).subscribe(
				(resp) =>
					(this.heading = {
						title: resp.label,
						subtitle: resp?.desc,
					}),
			);

		for (let index = 0; index < this.breadcrumbs.length; index++) {
			const element = this.breadcrumbs[index];

			if (element.label.includes('.'))
				this.#translate
					.stream(element.label)
					.subscribe((resp) => (this.breadcrumbs[index].label = resp));
		}

		this.buildBreadcrumbs(route.firstChild);
	}

	onAnimationEnd() {
		this.isNavigating = false;
	}

	ngOnDestroy(): void {
		this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
	}
}
