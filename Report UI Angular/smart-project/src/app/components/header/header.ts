import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  img: boolean = false;
}
