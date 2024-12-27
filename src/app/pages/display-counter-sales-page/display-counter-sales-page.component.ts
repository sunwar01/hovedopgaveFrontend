import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {DatePipe, NgIf} from '@angular/common';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CounterSalesService} from '../../core/services/api/counterSales.service';
import {CounterSalesModel} from '../../core/models/counterSalesRelated/counterSales.model';
import {DatePickerModule} from 'primeng/datepicker';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {PaymentType} from '../../core/enums/paymentType.enum';
import {CounterService} from '../../core/services/api/counter.service';
import {CounterModel} from '../../core/models/counterRelated/counter.model';

@Component({
  selector: 'app-display-counter-sales-page',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    DatePickerModule,
    FloatLabelModule,
    FormsModule
  ],
  templateUrl: './display-counter-sales-page.component.html',
  styleUrl: './display-counter-sales-page.component.css'
})
export class DisplayCounterSalesPageComponent implements OnInit {

  availableCounterSales: CounterSalesModel[] = [];
  filteredCounterSales: CounterSalesModel[] = [];
  chosenDate: Date = new Date(Date.now());
  paymentType = PaymentType;
  counters: CounterModel[] = [];


  constructor(private counterSalesService : CounterSalesService, private currentStore : CurrentStoreService,
              private counterService: CounterService) { }


  getPaymentTypeText(paymentType: number): string {
    return this.paymentType[paymentType];
  }

  getCounterNameById(counterId: number): string {
    return this.counters.find(counter => counter.id === counterId)?.name || 'Unknown Counter';
  }

  updateAvailableCounterSales() {
    this.counterSalesService.GetCounterSales().subscribe(counterSales => {
      this.availableCounterSales = counterSales;
      this.filterCounterSalesByStoreIdAndDate();
    });
  }



  filterCounterSalesByStoreIdAndDate() {

    this.filteredCounterSales = this.availableCounterSales.filter(counterSale => {
      const saleDate = new Date(counterSale.saleDateTime);
      const chosenDate = new Date(this.chosenDate);


      console.log(saleDate);
      console.log(chosenDate);

      return (
        counterSale.storeId === this.currentStore.currentStore?.id &&
        saleDate.getMonth() === chosenDate.getMonth() && // Compare month
        saleDate.getDate() === chosenDate.getDate()     // Compare day
      );
    });


    console.log(this.chosenDate);

  }


  ngOnInit(): void {
    this.updateAvailableCounterSales();

    this.counterService.GetCounters().subscribe((data: CounterModel[]) => {
      this.counters = data;
    });



  }



}
