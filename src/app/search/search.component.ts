import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private route: ActivatedRoute, private router: Router) {
    route.queryParamMap.subscribe((queryParams) => {
      this.search = queryParams.get('search') || '';
    });
  }

  @Input('placeholder') placeholder = '';

  search: string = '';

  change(event: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.search || null },
      queryParamsHandling: 'merge',
    });
  }
}
