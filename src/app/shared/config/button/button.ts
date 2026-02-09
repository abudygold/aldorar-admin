import { ButtonModel } from '@devkitify/angular-ui-kit';

export const CREATE_BUTTON = (
	text: string = 'Basic Button',
	onClick?: VoidFunction,
): ButtonModel => ({
	text,
	appearance: 'flat',
	icon: 'add',
	onClick,
});
