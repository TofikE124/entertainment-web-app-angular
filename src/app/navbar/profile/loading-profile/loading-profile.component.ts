import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'loading-profile',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './loading-profile.component.html',
  styleUrl: './loading-profile.component.scss',
})
export class LoadingProfileComponent {}
