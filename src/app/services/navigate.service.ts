import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService implements OnInit {
  queryParams: { [key: string]: string } = {};
  savedUrl: string = '';
  savedQueryParams: { [key: string]: string } = {};
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.queryParams = {};
      queryParams.keys.forEach((key) => {
        this.queryParams[key] = queryParams.get(key) || '';
      });
    });
  }
  ngOnInit(): void {}

  save() {
    this.savedUrl = this.getUrl();
    this.savedQueryParams = this.queryParams;
  }

  navigate(navigateUrl: string) {
    this.router.navigate([navigateUrl], {
      queryParams: {
        returnUrl: this.savedUrl,
        returnQueryParams: JSON.stringify(this.savedQueryParams),
      },
    });
  }

  returnToSavedUrl() {
    console.log(this.savedUrl);
    this.router.navigate([this.savedUrl], {
      queryParams: { ...this.savedQueryParams },
    });
  }

  getUrl() {
    let url = this.router.url;

    return url.includes('?') ? url.slice(0, url.indexOf('?')) : url;
  }
}
