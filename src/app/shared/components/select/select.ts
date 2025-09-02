import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ISelectOption } from '@shared/interfaces/ISelectOption';

@Component({
    selector: 'app-select',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="relative w-full">
      <select
        [ngModel]="value"
        (ngModelChange)="onChange($event)"
        [disabled]="disabled"
        class="appearance-none w-full rounded pr-8 focus:outline-none focus:ring-0 border"
        [ngClass]="selectClass"
      >
        <option *ngFor="let opt of options" [ngValue]="opt.value">{{ opt.label }}</option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Select),
            multi: true
        }
    ]
})
export class Select implements ControlValueAccessor {
    @Input() options: ISelectOption[] = [];
    @Input() value: any;
    @Input() disabled: boolean = false;
    @Input() size: 'sm' | 'md' | 'lg' = 'sm';
    @Input() color: 'primary' | 'info' | 'warning' | 'danger' | '' = '';
    @Input() fullWidth: boolean = false;

    @Output() valueChange = new EventEmitter<any>();

    // ControlValueAccessor callbacks
    onChange = (_: any) => { };
    onTouched = () => { };

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = (value: any) => {
            this.value = value;
            this.valueChange.emit(value);
            fn(value);
        };
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // ขนาด + padding + font-size ของ select
    get selectSizeClass(): string {
        switch (this.size) {
            case 'sm': return 'text-sm py-1 px-2';
            case 'md': return 'text-base py-2 px-3';
            case 'lg': return 'text-lg py-3 px-4';
            default: return '';
        }
    }

    // รวม color + width + size class
    get selectClass(): string {
        const classes: string[] = [this.selectSizeClass];

        switch (this.color) {
            case 'primary': classes.push('border-blue-400 text-blue-700'); break;
            case 'info': classes.push('border-cyan-400 text-cyan-700'); break;
            case 'warning': classes.push('border-yellow-400 text-yellow-700'); break;
            case 'danger': classes.push('border-red-500 text-red-700'); break;
            default: classes.push('border-gray-300 text-gray-700'); break;
        }

        if (this.disabled) classes.push('opacity-50 cursor-not-allowed');
        if (this.fullWidth) classes.push('w-full');

        return classes.join(' ');
    }
}
