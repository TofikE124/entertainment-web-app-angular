import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LibraryMainComponent } from './library-main/library-main.component';

@Component({
  selector: 'library',
  standalone: true,
  imports: [NavbarComponent, LibraryMainComponent, CommonModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent {}
