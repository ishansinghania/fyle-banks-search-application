import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type MapKeyType = string | number;

@Injectable()
export class StorageService {
	private _objectMap: any = {};
	private keyName = 'favourite_banks';

	// To detect changes, like addition or removal, in favourite bank list
	localStorageBanks = new Subject();

	/*
		will store all the favourite bank in a single key value pair.
		the key is favourite_banks and the value will be an empty object initially.
		all the get and set will be done from inside the empty object.
	*/

	constructor() {}

	private getStorageItems() {
		return JSON.parse(localStorage.getItem(this.keyName)) || {};
	}

	private setStorageItems(items: any) {
		localStorage.setItem(this.keyName, JSON.stringify(items));
		this.localStorageBanks.next(this.getStorageItems());
	}

	getLocalItem(key: MapKeyType) {
		const items = this.getStorageItems();
		return items[key] ? items[key] : void 0;
	}

	getAllLocalItems() {
		return this.getStorageItems();
	}

	removeLocalItem(key: MapKeyType) {
		const items = this.getStorageItems();
		if (items[key]) {
			delete items[key];
			this.setStorageItems(items);
		}
	}

	setLocalItem(key: MapKeyType, value: any) {
		const items = this.getStorageItems();
		if (!items[key]) {
			items[key] = value;
			this.setStorageItems(items);
		}
	}

	clearAllLocal() {
		localStorage.clear();
		this.localStorageBanks.next(this.getStorageItems());
	}

	/*
		Methods to cache the http response inside a map;
	*/

	getAll(city: string): any {
		return this._objectMap[city];
	}

	getOne(pk: MapKeyType, city: string) {
		return this._objectMap[city][pk];
	}

	putAll(items: any[], city: string) {
		if (this.getAll(city)) delete this._objectMap[city];
		this._objectMap[city] = items;
	}

	clear() {
		this._objectMap = {};
	}

	// to reset the entire store, i.e. remove all cache and localStorage
	reset() {
		this._objectMap = {};
		localStorage.clear();
		this.localStorageBanks.next(this.getStorageItems());
	}
}
