import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { TrendingTitleComponent } from './titles/trending-title/trending-title.component';
import { Title } from './_models/Title';
import { RegularTitleComponent } from './titles/regular-title/regular-title.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
