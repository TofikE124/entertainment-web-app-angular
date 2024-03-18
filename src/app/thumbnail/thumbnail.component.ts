import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BookmarkComponent } from '../bookmark/bookmark.component';
import { Title } from '../_models/Title';
import { CommonModule } from '@angular/common';
import { ThumbnailImageComponent } from './thumbnail-image/thumbnail-image.component';
import { ThumbnailOverlayComponent } from './thumbnail-overlay/thumbnail-overlay.component';
import {
  BookmarkResponse,
  BookmarkService,
} from '../services/bookmark.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'thumbnail',
  standalone: true,
  imports: [
    CommonModule,
    BookmarkComponent,
    ThumbnailImageComponent,
    ThumbnailOverlayComponent,
  ],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ThumbnailComponent implements OnInit {
  @Input('is-trending') isTrending: boolean = false;
  @Input('title') title?: Title;

  thumbnailClass = {};
  thumbnailImageClass = {};

  constructor(
    private bookmarkService: BookmarkService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.thumbnailClass = {
      'lgmd:w-[470px] lgmd:h-[230px] sm:w-[240px] sm:h-[140px] ':
        this.isTrending,
      'lg:w-[280px] lg:h-[175px] md:w-[220px] md:h-[140px] sm:w-[165px] sm:h-[110px] ':
        !this.isTrending,
    };

    const { trending, regular } = this.title?.thumbnail!;

    let trendingLarge = `lg:bg-[url("${trending?.large || ''}")]`;
    let trendingSmall = `mdsm:bg-[url("${trending?.small || ''}")]`;

    let regularLarge = `lg:bg-[url("${regular?.large || ''}")]`;
    let regularMedium = `md:bg-[url("${regular?.medium || ''}")]`;
    let regularSmall = `sm:bg-[url("${regular?.small || ''}")]`;

    this.thumbnailImageClass = {
      [trendingLarge]: this.isTrending,
      [trendingSmall]: this.isTrending,
      [regularLarge]: !this.isTrending,
      [regularMedium]: !this.isTrending,
      [regularSmall]: !this.isTrending,
    };
  }

  async bookMarkClicked() {
    let result = await this.bookmarkService.bookmark(this.title!);
    if (result === BookmarkResponse.NOT_LOGGED_IN)
      this.toastrService.warning('Please login first to bookmark', 'Login', {
        timeOut: 2000,
      });
  }
}
