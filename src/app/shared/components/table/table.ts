import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';
import { BaseComponent } from '@shared/common/base-component';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  imports: [CommonModule, FormsModule, Icon],
  host: { 'class': 'overflow-x-auto pt-2 block' }
})
export class Table extends BaseComponent {
  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() selectionType: 'checkbox' | 'radio' | null = null;
  @Input() totalItems: number = 0;
  @Output() selectionChange = new EventEmitter<any>();

  selectedRow: any = null;


  toggleAll(checked: boolean) {
    if (!this.selectionType) return;
    this.data.forEach(row => row.selected = checked);
    this.selectionChange.emit(this.getSelectedRows());
  }

  onSelectionChange(row: any) {
    if (this.selectionType === 'radio') {
      this.selectedRow = row;
      this.selectionChange.emit(row);
    } else if (this.selectionType === 'checkbox') {
      this.selectionChange.emit(this.getSelectedRows());
    }
  }

  allSelected(): boolean {
    return this.data.every(row => row.selected);
  }

  getSelectedRows() {
    return this.data.filter(row => row.selected);
  }
}
