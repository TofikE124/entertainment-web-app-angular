import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bookmark',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss',
})
export class BookmarkComponent {
  @Input('bookmarked') bookmarked: boolean = true;
}
