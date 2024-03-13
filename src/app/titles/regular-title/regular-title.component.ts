import { Component, Input, OnInit } from '@angular/core';
import { ThumbnailComponent } from '../../thumbnail/thumbnail.component';
import { Title } from '../../_models/Title';

@Component({
  selector: 'regular-title',
  standalone: true,
  imports: [ThumbnailComponent],
  templateUrl: './regular-title.component.html',
  styleUrl: './regular-title.component.scss',
})
export class RegularTitleComponent implements OnInit {
  @Input('title') title?: Title;

  categoryImgSrc = '';

  ngOnInit(): void {
    this.categoryImgSrc =
      this.title?.category === 'Movie'
        ? '/assets/icon-category-movie.svg'
        : '/assets/icon-category-tv.svg';
  }
}
