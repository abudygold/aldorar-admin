export interface IOptionList {
	label: string;
	value: string;
	code?: string;
	id?: string;
}

export const GetOptionsByCode = (data: IOptionList[], code: string): IOptionList[] =>
	data.filter((item: IOptionList) => item.code === code);
