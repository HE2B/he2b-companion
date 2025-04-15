export interface School {
	shortName: string;
	fullName: string;
	department: string;
	address: {
		street: string;
		number: string;
		zip: string;
		city: string;
	};
	phoneNumber: string;
	// TODO: add email
	color: string;
	// TODO: add base64 logos
}
