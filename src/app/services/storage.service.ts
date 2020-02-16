import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export type MapKeyType = string | number;

@Injectable()
export class StorageService {
	private _objectMap: any = {};
	private keyName = 'favourite_banks';
	localStorage = window.localStorage;

	/*
		will store all the favourite bank in a single key value pair.
		the key is favourite_banks and the value will be an empty object initially.
		all the get and set will be done from inside the empty object.
	*/

	constructor() {
		this.localStorage.setItem(this.keyName, JSON.stringify({}));
	}

	private getStorageItems() {
		return JSON.parse(this.localStorage.getItem(this.keyName));
	}

	private setStorageItems(items: any) {
		this.localStorage.setItem(this.keyName, JSON.stringify(items));
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
		this.localStorage.clear();
	}

	/*
		Methods to cache the http response inside a map;
	*/

	get(pk: MapKeyType): any {
		return this._objectMap[pk];
	}

	getAll(): any[] {
		return _.values(this._objectMap);
	}

	getOrCreate(id: MapKeyType): any {
		const obj = this.get(id);
		if (!obj) {
			this._objectMap[id] = obj;
		}
		return obj;
	}

	put(item: any, pk: MapKeyType) {
		const cached = this._objectMap[pk];
		if (!cached) this._objectMap[pk] = item;
	}

	putAll(items: any[], pk: MapKeyType) {
		_.forEach(items, (item) => {
			this.put(item, item[pk]);
		});
	}

	clear() {
		this._objectMap = {};
	}

	// to reset the entire store, i.e. remove all cache and localStorage
	reset() {
		this._objectMap = {};
		this.localStorage.clear();
	}
}
