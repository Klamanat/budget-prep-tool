import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-select',
    standalone: true,
    templateUrl: './select.html',
    styleUrls: ['./select.css'],
    imports: [CommonModule, FormsModule]
})
export class Select {
    @Input() options: { label: string, value: any }[] = [];
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
}
