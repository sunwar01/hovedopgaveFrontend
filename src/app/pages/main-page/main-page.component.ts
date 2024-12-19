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
export class MainPageComponent
{

  constructor()
  {
  }



  tiles = [
    { title: 'Kasse (salg)', icon: 'pi pi-shopping-cart', link: '/counter' },
    { title: 'Opret ny sag', icon: 'pi pi-plus', link: '/create-case' },
    { title: 'Søg efter sag', icon: 'pi pi-search', link: '/find-case' },
    { title: 'Vis seneste sager', icon: 'pi pi-clock', link: '/latest-cases' },
    { title: 'Vis uafsluttede sager', icon: 'pi pi-exclamation-circle', link: '/unsolved-cases' },
    { title: 'Varer', icon: 'pi pi-box', link: '/products' },
    { title: 'Administrer lagerbeholdning', icon: 'pi pi-cog', link: '/stock-management' },
    { title: 'Find kvittering', icon: 'pi pi-file', link: '/find-receipt' },
    { title: 'Vis seneste kvitteringer', icon: 'pi pi-file', link: '/latest-receipts' },
  ];







}
