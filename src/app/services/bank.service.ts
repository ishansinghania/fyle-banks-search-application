import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { APIService } from './api.service';
import { StorageService } from './storage.service';

import { Bank } from './../model/bank';

@Injectable()
export class BankService {
	constructor(
		private _apiService: APIService,
		private _storageService: StorageService,
	) {}

	getAllBank(city: string = 'MUMBAI') {
		const banks = this._storageService.getAll(city);
		if (banks) {
			const response: {
				body: Bank[];
			} = {
				body: banks,
			};
			return of(response);
		}

		return this._apiService
			.get(Bank.route, { params: { city: city } })
			.pipe(
				tap((response: HttpResponse<Bank[]>) => {
					if (response.body)
						this._storageService.putAll(response.body, city);
				}),
			);
	}

	getFavourites() {
		return this._storageService.getAllLocalItems();
	}

	markAsFavourite(bank: Bank) {
		this._storageService.setLocalItem(bank.ifsc, bank);
	}
}
