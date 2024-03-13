import { Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';

export const routes: Routes = [
  { path: '', redirectTo: 'library/home', pathMatch: 'full' },
  { path: 'library', component: LibraryComponent },
  { path: 'library/:category', component: LibraryComponent },
];
