import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiPrefixInterceptor, StorageService, BankService, APIService } from './services';
import { BankSearchPipe } from './utils/bank-search.pipe';

const MATERIAL_COMPONENTS = [
	MatToolbarModule,
	MatFormFieldModule,
	MatSelectModule,
	MatInputModule,
];

@NgModule({
	declarations: [AppComponent, ...routedComponents, BankSearchPipe],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,

		...MATERIAL_COMPONENTS,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiPrefixInterceptor,
			multi: true,
		},
		StorageService,
		BankService,
		APIService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
