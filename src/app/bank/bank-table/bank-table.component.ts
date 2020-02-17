import {
	Component,
	Input,
	ChangeDetectorRef,
	AfterViewChecked,
	OnInit,
	SimpleChanges,
	OnChanges,
} from '@angular/core';
import { StorageService } from './../../services';
import { Bank } from '../../model/bank';

@Component({
	selector: 'bank-table',
	templateUrl: './bank-table.component.html',
})
export class BankTableComponent implements OnChanges, AfterViewChecked {
	@Input() banks: Bank[];
	banksList: Bank[];

	constructor(
		private _storageService: StorageService,
		private cdRef: ChangeDetectorRef,
	) {}

	pageChange(paginatedList: Bank[]) {
		this.banksList = [...paginatedList];
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

	ngOnChanges() {
		if (this.banks.length === 0) this.banksList = [];
	}

	ngAfterViewChecked() {
		this.cdRef.detectChanges();
	}
}
