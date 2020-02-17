import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import {
	ApiPrefixInterceptor,
	StorageService,
	BankService,
	APIService,
	PagerService,
} from './services';
import { BankSearchPipe } from './utils/bank-search.pipe';
import { FavouriteButtonComponent } from './bank/favourite-button/favourite-button.component';
import { FavouriteBankListComponent } from './bank/favourite-bank-list/favourite-bank-list.component';
import { PaginationComponent } from './utils/pagination/pagination.component';
import { BankTableComponent } from './bank/bank-table/bank-table.component';
import { LoaderModule } from './utils/loader';

const MATERIAL_COMPONENTS = [
	MatToolbarModule,
	MatFormFieldModule,
	MatSelectModule,
	MatInputModule,
	MatIconModule,
	MatButtonModule,
	MatTabsModule,
];

const COMPONENTS = [
	BankSearchPipe,
	FavouriteButtonComponent,
	FavouriteBankListComponent,
	PaginationComponent,
	BankTableComponent,
];

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		LoaderModule,

		...MATERIAL_COMPONENTS,
	],
	declarations: [AppComponent, ...routedComponents, ...COMPONENTS],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiPrefixInterceptor,
			multi: true,
		},
		StorageService,
		BankService,
		APIService,
		PagerService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
