import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface StringMap {
	[s: string]: string;
}

export interface RequestDataType {
	body?: any;
	headers?: StringMap;
	reportProgress?: boolean;
	observe?: 'response' | 'body' | 'events';
	params?: StringMap;
	responseType?: 'json' | 'text';
	withCredentials?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class APIService {
	constructor(protected httpClient: HttpClient) {}

	private getResourcePath(path: string, id?: number): string {
		return id ? `${path}/${id}` : path;
	}

	public getRequestHeader(headerObj: StringMap = {}): StringMap {
		const headers = {
			'Content-Type': 'application/json',
		};

		_.forEach(headerObj, function(val, key) {
			headers[key] = val;
			if (key && val === void 0) delete headers[key];
		});

		return headers;
	}

	public doAPI(
		method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
		path: string,
		request: RequestDataType = {},
	): Observable<any> {
		const requestData = {
			...request,
			observe: request.observe || 'response',
			headers: this.getRequestHeader(request.headers),
		};

		return this.httpClient.request(method, path, requestData);
	}

	public get(
		path: string,
		request?: RequestDataType,
		id?: number,
	): Observable<any> {
		return this.doAPI('GET', this.getResourcePath(path, id), request);
	}

	public post(path: string, request?: RequestDataType): Observable<any> {
		return this.doAPI('POST', this.getResourcePath(path), request);
	}

	public patch(
		path: string,
		request?: RequestDataType,
		id?: number,
	): Observable<any> {
		return this.doAPI('PATCH', this.getResourcePath(path, id), request);
	}

	public delete(
		path: string,
		request?: RequestDataType,
		id?: number,
	): Observable<any> {
		return this.doAPI('DELETE', this.getResourcePath(path, id), request);
	}
}
