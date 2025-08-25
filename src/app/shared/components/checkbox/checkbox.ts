import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    templateUrl: './checkbox.html',
    styleUrls: ['./checkbox.css'],
    imports: [CommonModule, FormsModule]
})
export class Checkbox {
    @Input() checked: boolean = false;
    @Input() label: string = '';
    @Output() checkedChange = new EventEmitter<boolean>();
}
