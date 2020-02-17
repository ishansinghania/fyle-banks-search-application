export class Bank {
	ifsc: string;
	bank_id: number;
	branch: string;
	address: string;
	city: string;
	district: string;
	state: string;
	bank_name: string;

	static route = '/banks';
}
