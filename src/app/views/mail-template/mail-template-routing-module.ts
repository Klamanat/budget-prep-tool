import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailTemplate } from './mail-template';

const routes: Routes = [
  { path: '', component: MailTemplate },
  { path: 'ongoing', component: MailTemplate },
  { path: 'completed', component: MailTemplate }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailTemplateRoutingModule {}
