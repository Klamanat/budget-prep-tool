import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule],
  templateUrl: './breadcrumbs.html',
  styles: ``
})
export class Breadcrumbs {
  @Input() menus: any[] = [];
}
