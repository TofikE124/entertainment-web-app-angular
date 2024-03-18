import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NavbarLinksComponent } from './navbar-links/navbar-links.component';
import { ActiveLinkComponent } from './active-link/active-link.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AppUser } from '../_models/AppUser';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    NavbarLinksComponent,
    ActiveLinkComponent,
    RouterModule,
    CommonModule,
    ProfileComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  appUser: AppUser | null = null;
  isAppUserLoading = true;
  constructor(private authService: AuthService) {
    authService.getAppUser$().subscribe((appUser) => {
      this.appUser = appUser;
      this.isAppUserLoading = false;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
