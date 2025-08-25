import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.css'],
  imports: [CommonModule, FormsModule]
})
export class Textarea {
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();
}
