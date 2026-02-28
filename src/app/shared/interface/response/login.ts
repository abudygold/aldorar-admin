export interface ILoginResp {
	accessToken: string;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		fullName: string;
		email: string;
		role: string;
	};
}
