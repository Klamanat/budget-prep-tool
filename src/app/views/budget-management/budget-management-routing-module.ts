import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetManagement } from './budget-management';

const routes: Routes = [
  { path: '', component: BudgetManagement },
  { path: 'ongoing', component: BudgetManagement },
  { path: 'completed', component: BudgetManagement }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetManagementRoutingModule {}
