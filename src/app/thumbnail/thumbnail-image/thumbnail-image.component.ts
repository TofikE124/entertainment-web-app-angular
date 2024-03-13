import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Title } from '../../_models/Title';

@Component({
  selector: 'thumbnail-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thumbnail-image.component.html',
  styleUrl: './thumbnail-image.component.scss',
})
export class ThumbnailImageComponent {
  @Input('is-trending') isTrending = false;
  @Input('title') title?: Title;
}
