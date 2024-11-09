import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TopMenuComponent} from './components/top-menu/top-menu.component';
import {NgIf} from '@angular/common';
import {PrimeNGConfig} from 'primeng/api';
import { Aura } from 'primeng/themes/aura';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'hovedopgaveFrontend';

  showHeader: boolean = true;

  constructor(private router: Router, private config: PrimeNGConfig)
  {

    this.config.theme.set({ preset: Aura });

    this.router.events.subscribe(() => {
      this.checkRoute();

    });

  }


  checkRoute() {
    const route = this.router.url;
    const routesWithoutHeader = ['/login', '/select-store'];
    this.showHeader = !routesWithoutHeader.includes(route);

  }

  ngOnInit(): void {




    const applyTheme = (prefersDark: boolean) => {
      document.body.classList.toggle('dark-theme', prefersDark);
      document.body.classList.toggle('light-theme', !prefersDark);
    };

    // Apply theme on load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);


    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      applyTheme(event.matches);
    });


    this.config.ripple.set(true);
  }



}
