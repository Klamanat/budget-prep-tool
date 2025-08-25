import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input',
    standalone: true,
    templateUrl: './input.html',
    styleUrls: ['./input.css'],
    imports: [CommonModule, FormsModule]
})
export class InputComponent {
    @Input() value: string = '';
    @Input() placeholder: string = '';
    @Input() type: string = 'text';
    @Output() valueChange = new EventEmitter<string>();
}
