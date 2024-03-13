import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar-links',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-links.component.html',
  styleUrl: './navbar-links.component.scss',
})
export class NavbarLinksComponent {}
