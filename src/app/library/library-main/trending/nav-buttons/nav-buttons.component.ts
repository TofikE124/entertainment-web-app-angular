import {NgIf} from '@angular/common';
import {AfterViewInit, Component} from '@angular/core';
import {title} from 'process';

import {Title} from '../../../../_models/Title';

@Component({
  selector: 'nav-buttons',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav-buttons.component.html',
  styleUrl: './nav-buttons.component.scss',
})
export class NavButtonsComponent {
  trendingElements?: HTMLDivElement;
  scrollAmount = 0;
  elementsPerScroll = 1.5;
  isFullScroll = false;


  rightClick() {
    this.checkTrendingElements();
    let size =
        this.trendingElements?.getElementsByClassName('trending-title')[0]
            ?.clientWidth ||
        0;
    this.trendingElements?.scrollBy({
      left: size * this.elementsPerScroll,
      behavior: 'smooth',
    });
  }

  leftClick() {
    this.checkTrendingElements();
    let size =
        this.trendingElements?.getElementsByClassName('trending-title')[0]
            ?.clientWidth ||
        0;
    this.trendingElements?.scrollBy({
      left: -size * this.elementsPerScroll,
      behavior: 'smooth',
    });
  }

  checkTrendingElements() {
    console.log(this.trendingElements);
    if (this.trendingElements) return;
    console.log('checking for trending elements');
    this.trendingElements =
        document.getElementById('trending-titles') as HTMLDivElement;
    console.log(`trending elements: ${this.trendingElements}`);


    this.trendingElements.onscrollend = (ev: Event) => {
      let target = ev.target as HTMLDivElement;
      this.scrollAmount = target.scrollLeft;

      this.isFullScroll =
          target.scrollWidth - target.clientWidth - this.scrollAmount < 3;
    };
  }
}
