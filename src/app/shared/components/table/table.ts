import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';
import { Checkbox } from "../checkbox/checkbox";
import { Select } from '../select/select';
import { ISelectOption } from '@shared/interfaces/ISelectOption';
import { ITableHeader } from '@shared/interfaces/ITableHeader';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  imports: [CommonModule, FormsModule, Icon, Checkbox, Select],
  host: { class: 'overflow-x-auto pt-2 block w-full' }
})
export class Table {
  @Input() headers: ITableHeader[] = [];
  @Input() data: any[] = [];
  @Input() selectionType: 'checkbox' | 'radio' | null = null;
  @Input() totalItems: number = 0;
  @Input() pageSizeOptions: ISelectOption[] = [10, 20, 50, 100].map(n => ({ label: n.toString(), value: n }));
  @Input() pageSize: number = this.pageSizeOptions[0].value;
  @Input() loading: boolean = false; // ✅ ใช้สำหรับ Skeleton

  @Output() selectionChange = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  selectedRow: any = null;
  currentPage = 1;
  allSelectedValue = false;

  // จำนวนแถว skeleton
  skeletonRows = Array.from({ length: 5 });

  someSelectedButNotAll(): boolean {
    const selectedCount = this.data.filter(r => r.selected).length;
    return selectedCount > 0 && selectedCount < this.data.length;
  }

  updateAllSelectedValue() {
    const selectedCount = this.data.filter(r => r.selected).length;
    this.allSelectedValue = selectedCount === this.data.length;
  }

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
      this.updateAllSelectedValue();
      this.selectionChange.emit(this.getSelectedRows());
    }
  }

  allSelected(): boolean {
    return this.data.length > 0 && this.data.every(row => row.selected);
  }

  getSelectedRows() {
    return this.data.filter(row => row.selected);
  }

  onPageSizeChange(pageSize: any) {
    this.pageSize = +pageSize;
    this.currentPage = 1;
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(this.currentPage);
  }

  goToFirst() {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
  }

  goToPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToNext() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToLast() {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage = totalPages;
      this.pageChange.emit(this.currentPage);
    }
  }
}
