import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'loading-regular-title',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './loading-regular-title.component.html',
  styleUrl: './loading-regular-title.component.scss',
})
export class LoadingRegularTitleComponent {}
