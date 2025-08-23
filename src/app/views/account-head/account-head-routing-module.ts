import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountHead } from './account-head';

const routes: Routes = [
  { path: '', component: AccountHead },
  { path: 'ongoing', component: AccountHead },
  { path: 'completed', component: AccountHead }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountHeadRoutingModule {}
