import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigateService } from '../../../services/navigate.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  returnUrl: string = '';
  returnQueryParams: { [key: string]: string } = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navigateService: NavigateService
  ) {
    route.url.subscribe((url) => {
      this.returnUrl = url.join('/');
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      queryParams.keys.forEach((key: string) => {});
    });
  }
  login() {
    this.navigateService.save();
    this.navigateService.navigate('/login');
  }
}
