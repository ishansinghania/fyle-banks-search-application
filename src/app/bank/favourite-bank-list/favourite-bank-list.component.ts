import * as _ from 'lodash';
import { Component, OnInit, OnChanges } from '@angular/core';

import { StorageService } from './../../services';
import { Bank } from '../../model/bank';

@Component({
	selector: 'favourite-bank-list',
	templateUrl: './favourite-bank-list.component.html',
	styleUrls: ['./favourite-bank-list.component.scss'],
})
export class FavouriteBankListComponent implements OnInit {
	favouriteBanks: Bank[];
	constructor(private _storageService: StorageService) {}

	getFavouriteBank() {
		// Listining to changes in local storage
		this._storageService.localStorageBanks.subscribe((banks: object) => {
			this.favouriteBanks = [];
			_.forEach(banks, bank => {
				this.favouriteBanks.push(bank);
			});
		});
	}

	ngOnInit() {
		this.getFavouriteBank();

		// We are getting the favourites as key:value pair, so converting it into a list of banks.
		const banks = this._storageService.getAllLocalItems();
		this.favouriteBanks = [];
		_.forEach(banks, bank => {
			this.favouriteBanks.push(bank);
		});
	}
}
