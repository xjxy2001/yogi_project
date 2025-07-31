import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Banner } from './components/banner/banner';
import { MainComponent } from './components/main/main';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Banner, MainComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
})
export class App {
  protected readonly title = signal('smart-project');
}
