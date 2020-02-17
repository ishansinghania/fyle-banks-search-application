import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';

import { BankService } from './../services/bank.service';
import { StorageService } from './../services/storage.service';
import { Bank } from '../model/bank';

@Component({
	selector: 'bank-dashboard',
	templateUrl: './bank-dashboard.component.html',
	styleUrls: ['./bank-dashboard.component.scss'],
})
export class BankDashBoardComponent implements OnInit {
	selectedCity: string = 'MUMBAI';
	searchText: string;
	bankList: Bank[];
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

	// To set or unset the favourite banks

	toggleSelction(event: any, key: string, value: Bank) {
		event
			? this._storageService.setLocalItem(key, value)
			: this._storageService.removeLocalItem(key);
	}

	// To check if the bank is favourite or not

	isFavorite(key: string): boolean {
		const favouriteBank = this._storageService.getLocalItem(key);
		return !!favouriteBank;
	}
}
