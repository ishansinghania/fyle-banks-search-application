import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';

import { BankService } from './../services/bank.service';
import { StorageService } from './../services/storage.service';
import { Bank } from '../model/bank';

@Component({
	selector: 'bank-dashboard',
	templateUrl: './bank-dashboard.component.html',
})
export class BankDashBoardComponent implements OnInit {
	selectedCity: string = 'MUMBAI';
	searchText: string;
	bankList: Bank[];
	filteredBankList: Bank[];
	displayList: Bank[];

	cityList = [
		{
			name: 'Mumbai',
			value: 'MUMBAI',
		},
		{
			name: 'Kolkata',
			value: 'KOLKATA',
		},
		{
			name: 'Bangalore',
			value: 'BANGALORE',
		},
		{
			name: 'Delhi',
			value: 'DELHI',
		},
		{
			name: 'Pune',
			value: 'PUNE',
		},
	];

	constructor(
		private _bankService: BankService,
		private _storageService: StorageService,
	) {}

	ngOnInit() {
		this.getBanks();
	}

	getBanks() {
		this._bankService.getAllBank(this.selectedCity).subscribe(response => {
			if (response.body && response.body.length)
				this.bankList = response.body as Bank[];
		});
	}

	changeSelectedCity(event: any) {
		this.getBanks();
	}

	pageChange(paginatedList: Bank[]) {
		this.displayList = [...paginatedList];
	}
}
