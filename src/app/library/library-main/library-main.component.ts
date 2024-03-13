import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Title } from '../../_models/Title';
import { SearchComponent } from '../../search/search.component';
import { TitleService } from './../../title.service';
import { TrendingComponent } from './trending/trending.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryType } from '../../_models/Category';
import { RegularTitleComponent } from '../titles/regular-title/regular-title.component';

@Component({
  selector: 'library-main',
  standalone: true,
  imports: [
    SearchComponent,
    TrendingComponent,
    RegularTitleComponent,
    CommonModule,
  ],
  templateUrl: './library-main.component.html',
  styleUrl: './library-main.component.scss',
})
export class LibraryMainComponent implements OnDestroy {
  titlesSubscription?: Subscription;
  filteredTitles: Title[] = [];
  titles: Title[] = [];
  trendingTitles: Title[] = [];

  search: string = '';

  category: CategoryType = CategoryType.Home;

  categoryTitles: { [key in CategoryType]: string } = {
    home: 'Recommended for you ',
    movies: 'Movies',
    'tv-series': 'TV Shows',
    bookmark: 'Bookmarks',
  };

  categorySearchSuffix: { [key in CategoryType]: string } = {
    home: '',
    movies: 'In Movies',
    'tv-series': 'In TV Shows',
    bookmark: 'In Bookmarks',
  };

  searchPlaceHolders: { [key in CategoryType]: string } = {
    home: 'Search for Movies or TV Series',
    movies: 'Search for Movies',
    'tv-series': 'Search for Tv Series',
    bookmark: 'Search in Bookmarks',
  };

  constructor(titleService: TitleService, private route: ActivatedRoute) {
    this.titlesSubscription = titleService.getAll().subscribe((titles) => {
      this.titles = titles;
      this.trendingTitles = titles.filter((t) => t.isTrending);
      this.filterTitles();
    });

    route.queryParamMap.subscribe((queryParams) => {
      this.search = queryParams.get('search') || '';
      this.filterTitles();
    });

    route.paramMap.subscribe((params) => {
      this.category =
        (params.get('category') as CategoryType) || CategoryType.Home;
      this.filterTitles();
    });
  }

  filterTitles() {
    this.filteredTitles = this.titles.filter((t) =>
      t.title.toLowerCase().includes(this.search.toLowerCase())
    );

    if (this.category == 'movies' || this.category == 'tv-series') {
      this.filteredTitles = this.filteredTitles.filter((t) =>
        this.category == 'tv-series'
          ? t.category == 'TV Series'
          : t.category == 'Movie'
      );
    }
  }

  ngOnDestroy(): void {
    this.titlesSubscription?.unsubscribe();
  }
}
