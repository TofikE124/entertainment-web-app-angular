import { Component } from '@angular/core';
import { NavbarLinksComponent } from './navbar-links/navbar-links.component';
import { ActiveLinkComponent } from './active-link/active-link.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [NavbarLinksComponent, ActiveLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}
