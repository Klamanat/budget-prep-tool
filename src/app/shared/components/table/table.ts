import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  imports: [CommonModule]
})
export class Table {
  @Input() headers: string[] = [];
  @Input() rows: any[][] = [];
}
