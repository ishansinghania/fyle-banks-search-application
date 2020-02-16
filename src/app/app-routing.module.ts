import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankDashBoardComponent } from './bank/bank-dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: BankDashBoardComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

export const routedComponents = [
	BankDashBoardComponent,
];
