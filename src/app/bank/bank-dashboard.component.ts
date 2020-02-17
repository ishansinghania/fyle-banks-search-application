import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';

import { BankService } from './../services/bank.service';
import { Bank } from '../model/bank';
import { LoaderService } from '../utils/loader';

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
		private _loader: LoaderService,
	) {}

	ngOnInit() {
		this.getBanks();
	}

	getBanks() {
		this._loader.show();
		this._bankService.getAllBank(this.selectedCity).subscribe(
			response => {
				if (response.body && response.body.length) {
					this.bankList = response.body as Bank[];
					this._loader.hideAll();
				}
			},
			err => {
				this._loader.hideAll();
			},
		);
	}

	changeSelectedCity(event: any) {
		this.getBanks();
	}

	pageChange(paginatedList: Bank[]) {
		this.displayList = [...paginatedList];
	}
}
