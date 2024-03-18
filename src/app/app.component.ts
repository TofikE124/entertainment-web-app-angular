import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    authService: AuthService,
    userService: UserService,
    route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    authService.getAuthState().subscribe((state) => {
      if (state) userService.save(state);
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Or use document.documentElement.scrollTo()
      });
  }
}
