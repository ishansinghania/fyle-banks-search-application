import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LOADER = 'global';

@Injectable()
export class LoaderService {
	private _loaders: {
		[key: string]: BehaviorSubject<boolean>;
	} = {};
	private _pendingLoaders: {
		[key: string]: any;
	} = {};

	// If a loader is shared by multiple requests, then whichever request gets fulfilled first and hides the shared
	// loader, which lead to the loader not being displayed for the pending requests. So, now counting the no. of requests
	// that are opening the shared loader, and hiding the loader after the last request is fulfilled.
	private _openedLoaderInstances: {
		[key: string]: number;
	} = {};

	register(indicatorId: string = DEFAULT_LOADER): BehaviorSubject<boolean> {
		this._loaders[indicatorId] = new BehaviorSubject<boolean>(false);
		return this._loaders[indicatorId];
	}

	getIndicatorSubject(
		indicatorId: string = DEFAULT_LOADER,
	): BehaviorSubject<boolean> {
		return this._loaders[indicatorId];
	}

	show(indicatorId: string = DEFAULT_LOADER) {
		delete this._pendingLoaders[indicatorId]; // Deleting loader timeout after it is shown.

		if (this._openedLoaderInstances[indicatorId] === void 0) {
			this._openedLoaderInstances[indicatorId] = 1;
			this._loaders[indicatorId].next(true);
		} else {
			++this._openedLoaderInstances[indicatorId];
		}
	}

	showIfNeeded(indicatorId: string = DEFAULT_LOADER, delay: number = 500) {
		if (this._pendingLoaders[indicatorId]) return;

		this._pendingLoaders[indicatorId] = setTimeout(() => {
			// If the timeoutId for pending loaders exists then show, we are performing a check on this because
			// in show function we are deleting the timeout id from pending loaders but not cancelling the timeout.
			if (this._pendingLoaders[indicatorId]) this.show(indicatorId);
		}, delay);
	}

	hide(indicatorId: string = DEFAULT_LOADER) {
		if (this._pendingLoaders[indicatorId]) {
			clearTimeout(this._pendingLoaders[indicatorId]);
			delete this._pendingLoaders[indicatorId];
		} else {
			if (this._openedLoaderInstances[indicatorId] !== void 0) {
				if (--this._openedLoaderInstances[indicatorId] <= 0) {
					this._loaders[indicatorId].next(false);
					delete this._openedLoaderInstances[indicatorId];
				}
			}
		}
	}

	hideAll() {
		// Cancelling all pending timeouts, as sometimes hide all is called
		// first and then show is called, so the loader never closes.
		_.forEach(this._pendingLoaders, (loader: any, id: string) => {
			clearTimeout(loader);
			delete this._pendingLoaders[id];
		});

		_.forEach(
			this._loaders,
			(subject: BehaviorSubject<boolean>, id: string) => {
				subject.next(false);
			},
		);
		this._openedLoaderInstances = {};
	}
}
