import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'bankSearchPipe',
})
export class BankSearchPipe implements PipeTransform {
	transform(items: any[], searchText: string): any[] {
		if (!items) return [];
		if (!searchText) return [...items];
		searchText = searchText.toLowerCase();

		return _.filter(items, function(item) {
			const columnKeys = _.keys(item);
			return _.find(columnKeys, function(key) {
				if (item[key]) {
					return _.includes(_.lowerCase(item[key]), searchText);
				}
			});
		});
	}
}
