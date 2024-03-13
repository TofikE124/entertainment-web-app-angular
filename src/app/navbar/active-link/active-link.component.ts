import { CategoryType } from './../../_models/Category';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'active-link',
  standalone: true,
  imports: [],
  templateUrl: './active-link.component.html',
  styleUrl: './active-link.component.scss',
})
export class ActiveLinkComponent {
  category: CategoryType = CategoryType.Home;

  maskUrls: { [key in CategoryType]: string } = {
    [CategoryType.Home]: `url("/assets/logo.svg")`,
    [CategoryType.Movies]: `url("/assets/icon-nav-movies.svg")`,
    [CategoryType.TVSeries]: `url("/assets/icon-nav-tv-series.svg")`,
    [CategoryType.Bookmark]: `url("/assets/icon-nav-bookmark.svg")`,
  };
  maskUrl = this.maskUrls[this.category];

  constructor(private route: ActivatedRoute) {
    route.paramMap.subscribe((params) => {
      this.category = (params.get('category') as CategoryType) || 'home';
      this.maskUrl = this.maskUrls[this.category];
    });
  }
}
