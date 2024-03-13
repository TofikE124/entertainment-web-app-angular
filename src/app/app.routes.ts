import { Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'library/home', pathMatch: 'full' },
  { path: 'library', component: LibraryComponent },
  { path: 'library/:category', component: LibraryComponent },
  { path: 'login', component: LoginComponent },
];
