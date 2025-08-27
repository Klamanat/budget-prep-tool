import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styles: ``
})
export class Button {
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'info' | 'warning' | 'danger' | '' = '';

  getSizeClass(): string {
    switch (this.size) {
      case 'sm': return 'px-2 py-1 text-sm';
      case 'md': return 'px-4 py-1.5 text-base';
      case 'lg': return 'px-6 py-2 text-lg';
      default: return 'px-4 py-1.5 text-base';
    }
  }

  getColorClass(): string {
    switch (this.color) {
      case 'primary':
        return 'btn bg-blue-400 text-white';
      case 'info':
        return 'btn bg-cyan-400 text-white';
      case 'warning':
        return 'btn bg-yellow-400 text-white';
      case 'danger':
        return 'btn bg-red-500 text-white';
      default:
        return 'btn bg-white text-gray-700';
    }
  }
}
