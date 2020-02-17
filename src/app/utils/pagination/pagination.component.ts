import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnInit,
	SimpleChanges,
	OnChanges,
} from '@angular/core';
import { PagerService, Pager } from '../../services';

@Component({
	// tslint:disable-next-line: component-selector
	selector: 'paginator',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
	@Input() items: any[];
	@Input() initialPage = 1;
	@Input() pageSize = 10;
	@Input() maxPages = 10;
	@Output() changePage = new EventEmitter<any[]>();

	pager: Pager;

	constructor(private _pagerService: PagerService) {}

	ngOnChanges(changes: SimpleChanges) {
		// reset page if items array has changed
		if (changes.pageSize)
			this.setPage(this.initialPage);

		if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
			this.setPage(this.initialPage);
		}
	}

	setPage(page: number) {
		// Initialize pager, to page number 1
		this.pager = this._pagerService.getPager(this.items.length, page, this.pageSize);

		// return current page of items
		const pagedItems = this.items.slice(
			this.pager.startIndex,
			this.pager.endIndex + 1,
		);
		this.changePage.emit([...pagedItems]);
	}
}
