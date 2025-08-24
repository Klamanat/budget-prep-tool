import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPBD } from './user-pbd';

const routes: Routes = [
  { path: '', component: UserPBD },
  { path: 'list', component: UserPBD },
  { path: 'allocation', component: UserPBD },
  { path: 'adhoc', component: UserPBD },
  { path: 'user-management', component: UserPBD },
  { path: 'data-management', component: UserPBD },
  { path: 'news', component: UserPBD },
  { path: 'report', component: UserPBD }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPBDRoutingModule {}
