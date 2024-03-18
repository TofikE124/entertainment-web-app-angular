import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryType } from '../../../_models/Category';
import { Title } from '../../../_models/Title';
import { RegularTitleComponent } from '../../titles/regular-title/regular-title.component';
import { LoadingRegularTitleComponent } from '../../titles/loading-regular-title/loading-regular-title.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'regular',
  standalone: true,
  imports: [CommonModule, RegularTitleComponent, LoadingRegularTitleComponent],
  templateUrl: './regular.component.html',
  styleUrl: './regular.component.scss',
})
export class RegularComponent {
  @Input('titlesLoading') titlesLoading = true;
  @Input('sectionTitles') sectionTitles: Title[] = [];

  search: string = '';
  category: CategoryType = CategoryType.Home;

  appUser$;

  constructor(private route: ActivatedRoute, authService: AuthService) {
    route.queryParamMap.subscribe((queryParams) => {
      this.search = queryParams.get('search') || '';
    });

    route.paramMap.subscribe((params) => {
      this.category =
        (params.get('category') as CategoryType) || CategoryType.Home;
    });

    this.appUser$ = authService.getAppUser$();
  }

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

  trackByFn(index: number, item: any): number | string {
    return item.title;
  }

  loadingArr = new Array(15);
}
