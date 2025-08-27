import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admin } from './admin';
import { Roles } from './roles/roles';

const routes: Routes = [
  {
    path: '',
    component: Admin
  },
  {
    path: 'roles',
    component: Roles
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
