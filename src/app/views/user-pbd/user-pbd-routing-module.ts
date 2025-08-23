import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPBD } from './user-pbd';

const routes: Routes = [
  { path: '', component: UserPBD },
  { path: 'ongoing', component: UserPBD },
  { path: 'completed', component: UserPBD }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPBDRoutingModule {}
