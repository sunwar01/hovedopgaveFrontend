import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModel} from '../../core/models/storeRelated/store.model';

import {Router} from '@angular/router';
import {StoreService} from '../../core/services/api/store.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SharedModule} from 'primeng/api';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatGridList,
    MatGridTile,
    NgForOf,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,
    SharedModule,
    NgStyle
  ],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent implements OnInit
{

  tileColor = '';

  availableStores: StoreModel[] = [];

  constructor(private router: Router, private storeService: StoreService, private currentStore: CurrentStoreService)
  {
  }


  StoreClicked(store: StoreModel)
  {
    this.currentStore.setCurrentStore(store, 1);
    this.router.navigate(['/main']);
  }

  ngOnInit(): void
  {
    this.storeService.GetStores().subscribe((data: StoreModel[]) =>
    {
      this.availableStores = data;

      if (this.availableStores.length <= 1)
      {
        this.currentStore.setCurrentStore(this.availableStores[0], 7);
        this.router.navigate(['/main']);
      }

    });




  }

}
