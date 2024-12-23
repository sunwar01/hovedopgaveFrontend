import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {SharedModule} from 'primeng/api';
import {StoreModel} from '../../core/models/storeRelated/store.model';
import {CounterModel} from '../../core/models/counterRelated/counter.model';
import {CounterService} from '../../core/services/api/counter.service';
import {CurrentCounterService} from '../../core/services/currentCounterService/currentCounter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {Action} from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-select-counter-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    NgForOf,
    NgOptimizedImage,
    SharedModule,
    NgClass,
    NgIf
  ],
  templateUrl: './select-counter-page.component.html',
  styleUrl: './select-counter-page.component.css'
})
export class SelectCounterPageComponent implements OnInit{


  availableCounters: CounterModel[] = [];
  counterSelectionType: string = "";

  constructor(private counterService : CounterService, private currentCounter : CurrentCounterService,
              private router: Router, private currentStore : CurrentStoreService,
              private route : ActivatedRoute)
  {
  }


  CounterClicked(counter: CounterModel)
  {

    this.route.params.subscribe(params => {

      if (params['type'] == "select" && counter.status) {
        console.log("Counter selected");
        this.currentCounter.setCurrentCounter(counter);
        this.router.navigate(['/counter']);
      } else {

        console.log("Counter selected, but not open");
        this.router.navigate(['/open-counter', counter.id]);

      }

      if (params['type'] == "open" && !counter.status) {
         console.log("Open case");
        this.router.navigate(['/open-counter', counter.id]);
      }


      if (params['type'] == "close" && counter.status) {
        console.log("Close case");
        this.router.navigate(['/close-counter', counter.id]);
      }

    });

  }


  ngOnInit(): void
  {
    this.counterService.GetCounters().subscribe((data: CounterModel[]) => {

      if (this.currentStore.currentStore) {

      const storeId = this.currentStore.currentStore.id;


        this.route.params.subscribe(params => {

          this.counterSelectionType = params['type'];

          if (params['type'] == "select") {

            this.availableCounters = data.filter(counter => counter.storeId === storeId);

            if (this.availableCounters.length <= 1 && this.availableCounters[0].status) {
              this.currentCounter.setCurrentCounter(this.availableCounters[0]);
              this.router.navigate(['/counter']);
            }
          }

          if (params['type'] == "open") {
            this.availableCounters = data.filter(counter => counter.storeId === storeId && !counter.status);
          }

          if (params['type'] == "close") {
            this.availableCounters = data.filter(counter => counter.storeId === storeId && counter.status);
          }

        });



      }
    });


  }

}
