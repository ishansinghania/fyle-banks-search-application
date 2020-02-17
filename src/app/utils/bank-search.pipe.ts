import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'bankSearchPipe',
})
export class BankSearchPipe implements PipeTransform {

	transform(items: any[], searchText: string): any[] {
		if (!items) return [];
		if (!searchText) return [...items];
		searchText = searchText.toLowerCase();

		return items.filter(it => {
			return it.bank_name.toLowerCase().includes(searchText);
		});
	}
}
