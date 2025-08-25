import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-alert',
    standalone: true,
    templateUrl: './alert.html',
    styleUrls: ['./alert.css'],
    imports: [CommonModule, FormsModule]
})
export class Alert {
    @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';
    @Input() message: string = '';
}
