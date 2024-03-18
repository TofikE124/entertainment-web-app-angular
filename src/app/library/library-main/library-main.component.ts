import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryType } from '../../_models/Category';
import { Title } from '../../_models/Title';
import { SearchComponent } from '../../search/search.component';
import { BookmarkService } from '../../services/bookmark.service';
import { TitleService } from '../../services/title.service';
import { RegularComponent } from './regular/regular.component';
import { TrendingComponent } from './trending/trending.component';

enum ChangeType {
  INITIAL,
  PARAM_CHANGE,
  SEARCH_CHANGE,
}

@Component({
  selector: 'library-main',
  standalone: true,
  imports: [SearchComponent, TrendingComponent, RegularComponent, CommonModule],
  templateUrl: './library-main.component.html',
  styleUrl: './library-main.component.scss',
})
export class LibraryMainComponent implements OnDestroy, OnInit {
  titlesSubscription?: Subscription;
  allTitles: Title[] = [];
  filteredTitles: Title[] = [];
  sectionTitles: Title[] = [];
  shuffledTitles: Title[] = [];
  trendingTitles: Title[] = [];

  titlesLoading = true;

  category: CategoryType = CategoryType.Home;
  search: string = '';

  searchPlaceHolders: { [key in CategoryType]: string } = {
    home: 'Search for Movies or TV Series',
    movies: 'Search for Movies',
    'tv-series': 'Search for Tv Series',
    bookmark: 'Search in Bookmarks',
  };

  constructor(
    bookmarkService: BookmarkService,
    private titleService: TitleService,
    route: ActivatedRoute
  ) {
    route.queryParamMap.subscribe((queryParams) => {
      this.search = queryParams.get('search') || '';
      this.filterTitles();
    });

    route.paramMap.subscribe((params) => {
      this.category =
        (params.get('category') as CategoryType) || CategoryType.Home;
      this.filterTitles(true);

      // Remove Recently Removed when navigating away
      localStorage.removeItem('recentlyRemoved');
    });
  }
  async ngOnInit() {
    this.titlesSubscription = (await this.titleService.getAll())!.subscribe(
      (titles$) => {
        titles$.subscribe((titles) => {
          this.titlesLoading = false;
          this.allTitles = titles;
          this.trendingTitles = titles.filter((t) => t.isTrending);
          this.filterTitles();
        });
      }
    );
  }

  filterTitles(paramChanged?: boolean) {
    this.filteredTitles = this.allTitles.filter((t) =>
      t.title.toLowerCase().includes(this.search.toLowerCase())
    );
    let firstTime = !this.shuffledTitles.length;
    if (this.category == 'home') {
      this.getHomeTitles(paramChanged || firstTime);
    } else if (this.category == 'movies' || this.category == 'tv-series') {
      this.sectionTitles = this.filteredTitles.filter((t) =>
        this.category == 'tv-series'
          ? t.category == 'TV Series'
          : t.category == 'Movie'
      );
    } else if (this.category == 'bookmark') {
      let recentlyRemoved: number[] = JSON.parse(
        localStorage.getItem('recentlyRemoved') || '[]'
      );

      this.sectionTitles = this.filteredTitles.filter(
        (t) => t.bookmarked || recentlyRemoved.includes(t.key)
      );
    }
  }

  ngOnDestroy(): void {
    this.titlesSubscription?.unsubscribe();
  }

  getHomeTitles(shuffle: boolean) {
    if (shuffle) {
      this.shuffledTitles = this.shuffleArr(
        this.filteredTitles,
        5,
        this.filteredTitles.length - 6
      );
      this.sectionTitles = this.shuffledTitles;
    } else {
      this.sectionTitles = this.shuffledTitles.map((t) => ({
        ...t,
        bookmarked: this.filteredTitles.find(
          (filteredT) => filteredT.key == t.key
        )?.bookmarked,
      })) as Title[];
      if (this.search) this.sectionTitles = this.filteredTitles;
    }
  }

  shuffleArr(arr: any[], minRange: number, maxRange: number) {
    let length = Math.random() * (maxRange - minRange + 1) + minRange;
    let shuffled = arr.slice().sort(() => Math.random() - 0.5);
    return shuffled.slice(0, length);
  }
}
