import { Component, Input } from '@angular/core';
import { AppUser } from '../../../_models/AppUser';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'logged-profile',
  standalone: true,
  imports: [],
  templateUrl: './logged-profile.component.html',
  styleUrl: './logged-profile.component.scss',
})
export class LoggedProfileComponent {
  @Input('appUser') appUser?: AppUser;

  constructor(private authService: AuthService) {}

  defaultImage = `https://i.stack.imgur.com/34AD2.jpg`;
  handleError(event: any) {
    event.target.src = this.defaultImage;
  }

  logOut() {
    this.authService.logOut();
  }
}
