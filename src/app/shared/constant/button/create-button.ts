import { signal } from '@angular/core';
import { ButtonModel } from '@devkitify/angular-ui-kit';

export const ADD_NEW_BUTTON = (
	text: string = 'Basic Button',
	onClick?: VoidFunction,
): ButtonModel => ({
	text,
	appearance: 'flat',
	icon: 'add',
	onClick,
});

export const SAVE_BUTTON = (
	text: string = 'Basic Button',
	onClick?: VoidFunction,
): ButtonModel => ({
	text,
	appearance: 'flat',
	icon: 'send',
	buttonClass: 'tw:min-w-32!',
	disabled: signal<boolean>(false),
	onClick,
});

export const CANCEL_BUTTON = (
	text: string = 'Basic Button',
	onClick?: VoidFunction,
): ButtonModel => ({
	text,
	appearance: 'stroked',
	buttonClass: 'tw:min-w-32!',
	disabled: signal<boolean>(false),
	onClick,
});
