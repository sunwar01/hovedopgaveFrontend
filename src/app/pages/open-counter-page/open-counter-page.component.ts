import {Component, OnInit} from '@angular/core';
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {DividerModule} from 'primeng/divider';
import {CurrentCounterService} from '../../core/services/currentCounterService/currentCounter.service';
import {CounterReportService} from '../../core/services/api/counterReport.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-open-counter-page',
  standalone: true,
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    FloatLabelModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    DividerModule,
    FormsModule
  ],
  templateUrl: './open-counter-page.component.html',
  styleUrl: './open-counter-page.component.css'
})
export class OpenCounterPageComponent implements OnInit  {

  // Counting input fields
  cash1000: number = 0;
  cash500: number = 0;
  cash200: number = 0;
  cash100: number = 0;
  cash50: number = 0;
  cash20: number = 0;
  cash10: number = 0;
  cash5: number = 0;
  cash2: number = 0;
  cash1: number = 0;
  cash05: number = 0;

  // balance input fields

  totalCounted: number = 0;
  isDifference : boolean = true;


  constructor(private currentCounterService: CurrentCounterService,
              private counterReportService : CounterReportService,
              private route : ActivatedRoute) {
  }


  calculateDifference() {





    this.route.params.subscribe(params => {

      if (params['counterId'] == null) {
        console.log("No counter id");
        return;
      }

      this.counterReportService.GetLatestCounterReportById(params['counterId']).subscribe((data) => {

        if (data != null) {

          console.log("Report available");

          let lastReportEndHolding = data.newHolding;

          if (lastReportEndHolding != null) {
            this.isDifference = this.totalCounted - lastReportEndHolding > 0;
          }


        }
      });

    });

  }

  calculateTotalCounted() {
    this.totalCounted = this.cash1000 * 1000 + this.cash500 * 500 + this.cash200 * 200 + this.cash100 * 100 +
      this.cash50 * 50 + this.cash20 * 20 + this.cash10 * 10 + this.cash5 * 5 + this.cash2 * 2 +
      this.cash1 * 1 + this.cash05 * 0.5;

    this.calculateDifference();
  }

  ngOnInit(): void {



  }




}
