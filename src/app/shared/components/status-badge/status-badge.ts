import { Component, computed, input } from '@angular/core';

@Component({
	selector: 'app-status-badge',
	template: `
		<span
			class="tw:inline-block tw:whitespace-nowrap tw:rounded-[0.27rem] tw:px-[0.65em] tw:pb-[0.25em] tw:pt-[0.35em] tw:text-center tw:align-baseline tw:text-sm tw:font-bold tw:leading-none tw:capitalize"
			[class]="badgeClass()">
			{{ statusLabel() }}
		</span>
	`,
})
export class StatusBadge {
	status = input.required<string>();

	badgeClass = computed(() => {
		switch (this.status()) {
			case 'paid':
			case 'completed':
				return 'tw:bg-green-100 tw:text-green-700';
			case 'partially_paid':
				return 'tw:bg-yellow-100 tw:text-yellow-700';
			case 'dp_paid':
			case 'confirmed':
				return 'tw:bg-blue-100 tw:text-blue-700';
			case 'cancelled':
				return 'tw:bg-red-100 tw:text-red-700';
			default:
				return 'tw:bg-gray-100 tw:text-gray-700';
		}
	});

	statusLabel = computed(() => {
		if (this.status() === 'dp_paid') return 'DP Paid';
		return this.status().replace('_', ' ');
	});
}
