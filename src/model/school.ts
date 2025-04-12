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
	color: string;
	// TODO: add base64 logos
}
