// number-to-juta.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'numberToJuta',
	standalone: true,
})
export class NumberToJutaPipe implements PipeTransform {
	transform(value: number | null | undefined): string {
		if (!value || value < 1_000_000) return '0 Juta';

		const juta = value / 1_000_000;

		// TRUNCATE ke 1 desimal (anti rounding)
		const truncated = Math.floor(juta * 10) / 10;

		const formatted = Number.isInteger(truncated)
			? truncated.toString()
			: truncated.toString().replace('.', ',');

		return `${formatted} Juta`;
	}
}
