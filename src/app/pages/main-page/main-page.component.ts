import {Component, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard} from '@angular/material/card';
import {Router, RouterLink} from '@angular/router';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {CardModule} from 'primeng/card';
import {NgForOf, NgStyle} from '@angular/common';
import {ThemeService} from '../../core/services/themeService/theme.service';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    RouterLink,
    CardModule,
    NgForOf,
    NgStyle,
    ButtonModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit
{

  constructor(private router: Router, private currentUser: CurrentUserService, private themeService: ThemeService)
  {
  }

  tileBorderColor = '';

  tiles = [
    { title: 'Kasse (salg)', icon: 'pi pi-shopping-cart', link: '/counter' },
    { title: 'Opret ny sag', icon: 'pi pi-plus', link: '/create-case' },
    { title: 'Søg efter sag', icon: 'pi pi-search', link: '/find-case' },
    { title: 'Vis seneste sager', icon: 'pi pi-clock', link: '/latest-cases' },
    { title: 'Vis uafsluttede sager', icon: 'pi pi-exclamation-circle' },
    { title: 'Varer', icon: 'pi pi-box', link: '/products' },
    { title: 'Administrer lagerbeholdning', icon: 'pi pi-cog', link: '/stock-management' },
    { title: 'Find kvittering', icon: 'pi pi-file', action: () => this.Logout() },
    { title: 'Vis seneste kvitteringer', icon: 'pi pi-file' },
  ];


  Logout()
  {
    this.currentUser.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.tileBorderColor = isDarkMode ? "#3f3f46" : "#e2e8f0";
    });
  }



}
