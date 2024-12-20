import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {SharedModule} from 'primeng/api';
import {StoreModel} from '../../core/models/storeRelated/store.model';
import {CounterModel} from '../../core/models/counterRelated/counter.model';
import {CounterService} from '../../core/services/api/counter.service';
import {CurrentCounterService} from '../../core/services/currentCounterService/currentCounter.service';
import {Router} from '@angular/router';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';

@Component({
  selector: 'app-select-counter-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    NgForOf,
    NgOptimizedImage,
    SharedModule,
    NgClass
  ],
  templateUrl: './select-counter-page.component.html',
  styleUrl: './select-counter-page.component.css'
})
export class SelectCounterPageComponent implements OnInit{


  availableCounters: CounterModel[] = [];

  constructor(private counterService : CounterService, private currentCounter : CurrentCounterService,
              private router: Router, private currentStore : CurrentStoreService)
  {
  }


  CounterClicked(counter: CounterModel)
  {

    if (counter.status) {
    this.currentCounter.setCurrentCounter(counter);
    this.router.navigate(['/counter']);
    } else {


    }



  }


  ngOnInit(): void
  {
    this.counterService.GetCounters().subscribe((data: CounterModel[]) => {

      if (this.currentStore.currentStore) {

      const storeId = this.currentStore.currentStore.id;

      this.availableCounters = data.filter(counter => counter.storeId === storeId);

      if (this.availableCounters.length <= 1) {
        this.currentCounter.setCurrentCounter(this.availableCounters[0]);
        this.router.navigate(['/counter']);
      }

      }
    });


  }

}
