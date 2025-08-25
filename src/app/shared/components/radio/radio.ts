import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-radio',
    standalone: true,
    templateUrl: './radio.html',
    styleUrls: ['./radio.css'],
    imports: [CommonModule, FormsModule]
})
export class Radio {
    @Input() name: string = '';
    @Input() options: { label: string, value: any }[] = [];
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
}
