import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppUser } from '../../_models/AppUser';
import { LoadingProfileComponent } from './loading-profile/loading-profile.component';
import { LoggedProfileComponent } from './logged-profile/logged-profile.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    CommonModule,
    LoadingProfileComponent,
    LoggedProfileComponent,
    LoginComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input('isAppUserLoading') isAppUserLoading = true;
  @Input('appUser') appUser: AppUser | null = null;
}
