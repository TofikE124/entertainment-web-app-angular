import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '../../../_models/Title';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { TrendingTitleComponent } from '../../titles/trending-title/trending-title.component';

@Component({
  selector: 'trending',
  standalone: true,
  imports: [CommonModule, TrendingTitleComponent, NavButtonsComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent {
  @Input('trendingTitles') trendingTitles: Title[] = [];
}
