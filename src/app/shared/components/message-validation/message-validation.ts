import { Component, computed, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';
import { MatError } from '@angular/material/form-field';

@Component({
	selector: 'app-message-validation',
	imports: [MatError],
	templateUrl: './message-validation.html',
	styleUrl: './message-validation.css',
})
export class MessageValidation {
	fieldState = input.required<FieldState<any, any>>();
	getFieldState = computed(() => this.fieldState());
}
