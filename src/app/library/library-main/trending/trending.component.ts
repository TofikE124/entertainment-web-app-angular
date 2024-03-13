import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Title } from '../../../_models/Title';
import { TrendingTitleComponent } from '../../../titles/trending-title/trending-title.component';

@Component({
  selector: 'trending',
  standalone: true,
  imports: [CommonModule, TrendingTitleComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent {
  @Input('trendingTitles') trendingTitles: Title[] = [];
}
