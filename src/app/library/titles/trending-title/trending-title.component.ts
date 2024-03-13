import { Component, Input, OnInit } from '@angular/core';
import { ThumbnailComponent } from '../../../thumbnail/thumbnail.component';
import { Title } from '../../../_models/Title';

@Component({
  selector: 'trending-title',
  standalone: true,
  imports: [ThumbnailComponent],
  templateUrl: './trending-title.component.html',
  styleUrl: './trending-title.component.scss',
})
export class TrendingTitleComponent implements OnInit {
  @Input('title') title?: Title;

  categoryImgSrc = '';

  ngOnInit(): void {
    this.categoryImgSrc =
      this.title?.category === 'Movie'
        ? '/assets/icon-category-movie.svg'
        : '/assets/icon-category-tv.svg';
  }
}
