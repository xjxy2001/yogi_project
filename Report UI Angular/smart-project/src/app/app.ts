import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Banner } from "./components/banner/banner";
import { Main } from "./components/main/main";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Banner, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('smart-project');
}
