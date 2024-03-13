import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'my-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-input.component.html',
  styleUrl: './my-input.component.scss',
})
export class MyInputComponent {
  @Input('placeholder') placeholder: string = '';
  @Input('error-message') errorMessage = '';
}
