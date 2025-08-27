import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from '@shared/components/components-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ComponentsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'budget-prep-tool';
}
