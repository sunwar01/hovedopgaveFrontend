import {Component, OnInit} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {MenuItem} from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MenuModule} from 'primeng/menu';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {ImageModule} from 'primeng/image';
import {ThemeService} from '../../core/services/themeService/theme.service';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {Router} from '@angular/router';
import {CurrentCounterService} from '../../core/services/currentCounterService/currentCounter.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {StoreModel} from '../../core/models/storeRelated/store.model';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    MenubarModule,
    AvatarModule,
    InputTextModule,
    OverlayBadgeModule,
    NgClass,
    Ripple,
    ToolbarModule,
    ButtonModule,
    NgOptimizedImage,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MenuModule,
    IconFieldModule,
    InputIconModule,
    ImageModule
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent implements OnInit {


  constructor(private themeService: ThemeService, private router: Router, private currentUser: CurrentUserService,
              private currentCounter: CurrentCounterService, private currentStore: CurrentStoreService) {




  }

  logoSrc: string = '/ps_logo.png';

  kasseItems: MenuItem[] | undefined;
  servicermaItems: MenuItem[] | undefined;
  varerItems: MenuItem[] | undefined;
  lagerItems: MenuItem[] | undefined;
  rapporterItems: MenuItem[] | undefined;
  avatarItems: MenuItem[] | undefined;

  logout() {
    this.currentCounter.clearCurrentCounter();
    this.currentStore.clearCurrentStore();
    this.currentUser.clearCurrentUser();
    this.router.navigate(['/login']);
  }


  ngOnInit() {

    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.logoSrc = isDarkMode ? "/ps_logo_hvid.png" : "/ps_logo.png";
    });

    this.avatarItems = [
      { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
    ];

    this.kasseItems = [
      {
        label: 'Muligheder',
        items: [
          {
            label: 'Kasse (salg)',
            icon: 'pi pi-refresh',
            routerLink: '/counter'
          },
          {
            label: 'Luk kasse',
            icon: 'pi pi-upload',
            routerLink: ['/counter-selection', 'close']
          },
          {
            label: 'Åbn kasse',
            icon: 'pi pi-upload',
            routerLink: ['/counter-selection', 'open']
          },
          {
            label: 'Skift kasse',
            icon: 'pi pi-upload',
            routerLink: ['/counter-selection', 'select']
          },
          {
            label: 'Find kvittering',
            icon: 'pi pi-upload',
            routerLink: '/find-receipt'
          },
          {
            label: 'Vis seneste kvitteringer',
            icon: 'pi pi-upload',
            routerLink: '/latest-receipts'

          }
        ]
      }
    ];

    this.servicermaItems = [
      {
        label: 'Muligheder',
        items: [
          {
            label: 'Opret ny sag',
            icon: 'pi pi-refresh',
            routerLink: '/create-case'
          },
          {
            label: 'Søg efter sag',
            icon: 'pi pi-times',
            routerLink: '/find-case'
          },
          {
            label: 'Vis seneste sager',
            icon: 'pi pi-times',
            routerLink: '/latest-cases'
          },
          {
            label: 'Vis uafsluttede sager',
            icon: 'pi pi-times',
            routerLink: '/unsolved-cases'

          }

        ]
      }
    ];


    this.varerItems = [
      {
        label: 'Muligheder',
        items: [
          {
            label: 'Varer',
            icon: 'pi pi-refresh',
            routerLink: '/products'
          },
          {
            label: 'Kategorier',
            icon: 'pi pi-times',
            routerLink: '/category'

          },
          {
            label: 'Producenter',
            icon: 'pi pi-times',
            routerLink: '/manufacturer'
          },
          {
            label: 'Leverandører',
            icon: 'pi pi-times',
            routerLink: '/supplier'
          }


        ]
      }
    ];


    this.lagerItems = [
      {
        label: 'Muligheder',
        items: [
          {
            label: 'Administrer lagerbeholdning',
            icon: 'pi pi-refresh',
            routerLink: '/stock-management'
          }
        ]
      }
    ];


    this.rapporterItems = [
      {
        label: 'Muligheder',
        items: [
          {
            label: 'Kassetransaktioner',
            icon: 'pi pi-refresh',
            routerLink: '/show-counter-sales'
          },
          {
            label: 'Kasserapport',
            icon: 'pi pi-times',
            routerLink: '/show-counter-rapport'

          }

        ]
      }
    ];







  }



}
