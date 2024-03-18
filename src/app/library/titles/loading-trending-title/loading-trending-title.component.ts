import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'loading-trending-title',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './loading-trending-title.component.html',
  styleUrl: './loading-trending-title.component.scss',
})
export class LoadingTrendingTitleComponent {}
