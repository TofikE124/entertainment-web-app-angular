import { NgIf } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Title } from '../../../../_models/Title';
import { title } from 'process';

@Component({
  selector: 'nav-buttons',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav-buttons.component.html',
  styleUrl: './nav-buttons.component.scss',
})
export class NavButtonsComponent implements AfterViewInit {
  trendingElements?: HTMLDivElement;
  scrollAmount = 0;
  elementsPerScroll = 1.5;
  isFullScroll = false;

  ngAfterViewInit(): void {
    if (typeof document != 'undefined') {
      this.trendingElements = document.getElementById(
        'trending-titles'
      ) as HTMLDivElement;

      this.trendingElements.onscrollend = (ev: Event) => {
        let target = ev.target as HTMLDivElement;
        this.scrollAmount = target.scrollLeft;

        this.isFullScroll =
          target.scrollWidth - target.clientWidth - this.scrollAmount < 3;
      };
    }
  }

  rightClick() {
    let size =
      this.trendingElements?.getElementsByClassName('trending-title')[0]
        .clientWidth || 0;
    this.trendingElements?.scrollBy({
      left: size * this.elementsPerScroll,
      behavior: 'smooth',
    });
  }

  leftClick() {
    let size =
      this.trendingElements?.getElementsByClassName('trending-title')[0]
        .clientWidth || 0;
    this.trendingElements?.scrollBy({
      left: -size * this.elementsPerScroll,
      behavior: 'smooth',
    });
  }
}
