import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <label class="label cursor-pointer inline-flex items-center">
      <input
        type="checkbox"
        class="checkbox checkbox-xs rounded-sm bg-white"
        [class.checked:bg-blue-600]="color === 'primary'"
        [class.checked:text-white]="color === 'primary'"
        [class.checked:bg-green-600]="color === 'success'"
        [class.checked:bg-red-600]="color === 'error'"
        [checked]="checked"
        (change)="onChange($event)" />

      <span *ngIf="label" class="label-text text-gray-700 text-sm font-semibold">{{ label }}</span>
    </label>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Checkbox),
        multi: true
    }]
})
export class Checkbox implements ControlValueAccessor {
    @Input() label = '';
    @Input() color: 'primary' | 'success' | 'error' | '' = 'primary';
    @Output() checkedChange = new EventEmitter<boolean>();

    checked = false;

    private onTouched: () => void = () => { };
    private onChanged: (val: boolean) => void = () => { };

    writeValue(value: boolean): void {
        this.checked = value;
    }

    registerOnChange(fn: (val: boolean) => void): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onChange(event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        if (!input) return; // ป้องกัน null
        this.checked = input.checked;
        this.onChanged(this.checked);
        this.checkedChange.emit(this.checked);
    }
}
