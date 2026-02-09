import Swal, { SweetAlertResult } from 'sweetalert2';

export const DEFAULT_MESSAGE_CREATE = 'Record created successfully.';
export const DEFAULT_MESSAGE_UPDATE = 'Changes saved successfully.';
export const DEFAULT_MESSAGE_DELETE = 'Record deleted successfully.';

export const BaseAlert = (
	title: string,
	text: string,
	icon: 'warning' | 'error' | 'success' | 'info',
) => {
	Swal.fire({
		icon,
		title,
		text,
		draggable: true,
		showConfirmButton: false,
		timer: 1500,
	});
};

export const ConfirmAlert = (): Promise<SweetAlertResult<any>> => {
	return Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
	});
};
