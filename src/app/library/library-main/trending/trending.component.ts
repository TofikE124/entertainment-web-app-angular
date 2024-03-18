import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '../../../_models/Title';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { TrendingTitleComponent } from '../../titles/trending-title/trending-title.component';
import { LoadingTrendingTitleComponent } from '../../titles/loading-trending-title/loading-trending-title.component';

@Component({
  selector: 'trending',
  standalone: true,
  imports: [
    CommonModule,
    TrendingTitleComponent,
    NavButtonsComponent,
    LoadingTrendingTitleComponent,
  ],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent {
  @Input('titlesLoading') titlesLoading = true;
  @Input('trendingTitles') trendingTitles: Title[] = [];

  trackByFn(index: number, item: any): number | string {
    return item.title;
  }

  loadingArr = [1, 2, 3, 4];
}
