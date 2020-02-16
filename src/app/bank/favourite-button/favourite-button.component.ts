import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'favourite-button',
	templateUrl: './favourite-button.component.html',
	styleUrls: ['./favourite-button.component.scss'],
})
export class FavouriteButtonComponent {
	@Input() selected: boolean;
	@Output() selectionChange = new EventEmitter<any>();

	toggleSelected() {
		this.selected = !this.selected;
		this.selectionChange.emit(this.selected);
	}
}
