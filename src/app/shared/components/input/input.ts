import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `<input #inputEl
                   [type]="type"
                   [placeholder]="placeholder"
                   [(ngModel)]="value"
                   (ngModelChange)="valueChange.emit($event)"
                   [disabled]="disabled" />`
})
export class InputComponent implements AfterViewInit {
    @Input() value: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Input() disabled: boolean = false;

    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg';
    @Input() variant: 'default' | 'outline' | 'ghost' = 'default';
    @Input() width: 'full' | number | string = 'full';

    @Output() valueChange = new EventEmitter<string>();

    @ViewChild('inputEl', { static: true }) inputEl!: ElementRef<HTMLInputElement>;

    constructor(private r2: Renderer2) { }

    ngAfterViewInit() {
        // set class
        const classes: string[] = [];

        // width
        if (this.width === 'full') classes.push('w-full');
        else if (typeof this.width === 'number') this.r2.setStyle(this.inputEl.nativeElement, 'width', `${this.width}%`);
        else if (typeof this.width === 'string' && this.width) this.r2.setStyle(this.inputEl.nativeElement, 'width', this.width);

        // size
        switch (this.size) {
            case 'sm': classes.push('py-1 px-2 text-sm'); break;
            case 'md': classes.push('py-2 px-3 text-base'); break;
            case 'lg': classes.push('py-3 px-4 text-lg'); break;
        }

        // rounded
        switch (this.rounded) {
            case 'none': classes.push('rounded-none'); break;
            case 'sm': classes.push('rounded-sm'); break;
            case 'md': classes.push('rounded-md'); break;
            case 'lg': classes.push('rounded-lg'); break;
            case 'full': classes.push('rounded-full'); break;
        }

        // variant
        switch (this.variant) {
            case 'default': classes.push('input input-bordered focus:outline-none focus:ring-0'); break;
            case 'outline': classes.push('border border-gray-300 focus:ring-1 focus:ring-blue-400'); break;
            case 'ghost': classes.push('bg-transparent border-none focus:ring-0'); break;
        }

        // disabled
        if (this.disabled) classes.push('opacity-50 cursor-not-allowed');

        // apply class to input
        this.r2.setAttribute(this.inputEl.nativeElement, 'class', classes.join(' '));
    }
}
