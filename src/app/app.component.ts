import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hovedopgaveFrontend';

  showHeader: boolean = true;

  constructor(private router: Router)
  {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }


  checkRoute() {
    const route = this.router.url;
    const routesWithoutHeader = ['/login', '/select-store'];
    this.showHeader = !routesWithoutHeader.includes(route);

  }



}
