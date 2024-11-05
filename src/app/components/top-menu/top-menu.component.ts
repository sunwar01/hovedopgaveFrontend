import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {AvatarModule } from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {MatSlideToggle} from '@angular/material/slide-toggle';



@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatGridList,
    MatGridTile,
    NgForOf,
    NgOptimizedImage,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatToolbar,
    MatButton,
    MatToolbarRow,
    AvatarModule,
    BadgeModule,
    MatSlideToggle,
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {

}
