import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Icon } from '../icon/icon';

export interface TableHeader {
  title: string;
  key: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  slot?: TemplateRef<any>; // custom template
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
  imports: [CommonModule, FormsModule, Icon],
  host: { class: 'overflow-x-auto pt-2 block w-full' }
})
export class Table {
  @Input() headers: TableHeader[] = [];
  @Input() data: any[] = [];
  @Input() selectionType: 'checkbox' | 'radio' | null = null;
  @Input() totalItems: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 15];
  @Input() pageSize: number = this.pageSizeOptions[0]; // ค่าเริ่มต้น (default)
  @Output() selectionChange = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  selectedRow: any = null;
  currentPage = 1; // หน้าเริ่มต้น

  // Toggle all rows (checkbox)
  toggleAll(checked: boolean) {
    if (!this.selectionType) return;
    this.data.forEach(row => row.selected = checked);
    this.selectionChange.emit(this.getSelectedRows());
  }

  // Single row selection
  onSelectionChange(row: any) {
    if (this.selectionType === 'radio') {
      this.selectedRow = row;
      this.selectionChange.emit(row);
    } else if (this.selectionType === 'checkbox') {
      this.selectionChange.emit(this.getSelectedRows());
    }
  }

  allSelected(): boolean {
    return this.data.length > 0 && this.data.every(row => row.selected);
  }

  getSelectedRows() {
    return this.data.filter(row => row.selected);
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value; // แปลงเป็น number
    this.currentPage = 1; // กลับไปหน้าแรก
    this.pageSizeChange.emit(this.pageSize); // ส่ง event ให้ parent component
    this.pageChange.emit(this.currentPage); // reload data หน้าแรก
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
