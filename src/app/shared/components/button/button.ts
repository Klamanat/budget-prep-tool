import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, Icon],
  template: `
      @if(iconLeft) {
        <app-icon [name]="iconLeft" size="20"></app-icon>
      }

      <ng-content></ng-content>

      @if(iconRight) {
        <app-icon [name]="iconRight" size="20"></app-icon>
      }
  `
})
export class Button {
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'info' | 'warning' | 'danger' | '' = '';
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() fullWidth: boolean = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  @HostBinding('class') get hostClasses(): string {
    const classes: string[] = [];

    // size
    switch (this.size) {
      case 'sm': classes.push('px-2 py-1 text-sm'); break;
      case 'md': classes.push('px-4 py-2 text-base'); break;
      case 'lg': classes.push('px-6 py-3 text-lg'); break;
    }

    // color
    switch (this.color) {
      case 'primary': classes.push('bg-blue-400 text-white hover:bg-blue-500'); break;
      case 'info': classes.push('bg-cyan-400 text-white hover:bg-cyan-500'); break;
      case 'warning': classes.push('bg-yellow-400 text-white hover:bg-yellow-500'); break;
      case 'danger': classes.push('bg-red-500 text-white hover:bg-red-600'); break;
      default: classes.push('bg-white text-gray-700 hover:bg-gray-100'); break;
    }

    // rounded
    switch (this.rounded) {
      case 'none': classes.push('rounded-none'); break;
      case 'sm': classes.push('rounded-sm'); break;
      case 'md': classes.push('rounded-md'); break;
      case 'lg': classes.push('rounded-lg'); break;
      case 'full': classes.push('rounded-full'); break;
    }

    // width
    if (this.fullWidth) classes.push('w-full');

    // common
    classes.push('inline-flex items-center justify-center gap-1 cursor-pointer h-auto transition-all duration-150');

    // disabled
    if (this.disabled) {
      classes.push('opacity-50', '!cursor-not-allowed');
    }

    return classes.join(' ');
  }
}
