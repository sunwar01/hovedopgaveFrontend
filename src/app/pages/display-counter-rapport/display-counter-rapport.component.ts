import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from 'primeng/datepicker';
import {DatePipe, NgIf} from '@angular/common';
import {FloatLabelModule} from 'primeng/floatlabel';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CounterSalesModel} from '../../core/models/counterSalesRelated/counterSales.model';
import {PaymentType} from '../../core/enums/paymentType.enum';
import {CounterModel} from '../../core/models/counterRelated/counter.model';
import {CounterSalesService} from '../../core/services/api/counterSales.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {CounterService} from '../../core/services/api/counter.service';
import {FormsModule} from '@angular/forms';
import {CounterReportGetDto} from '../../core/models/counterReportRelated/dto/counterReportGet.dto';
import {CounterReportService} from '../../core/services/api/counterReport.service';

@Component({
  selector: 'app-display-counter-rapport',
  standalone: true,
  imports: [
    CardModule,
    DatePickerModule,
    DatePipe,
    FloatLabelModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule,
    FormsModule
  ],
  templateUrl: './display-counter-rapport.component.html',
  styleUrl: './display-counter-rapport.component.css'
})
export class DisplayCounterRapportComponent implements OnInit {

  availableCounterReports: CounterReportGetDto[] = [];
  filteredCounterReports: CounterReportGetDto[] = [];
  chosenDate: Date = new Date(Date.now());



  constructor(private counterReportService : CounterReportService, private currentStore : CurrentStoreService) { }




  updateAvailableCounterReports() {
    this.counterReportService.getCounterReports().subscribe(counterReports => {
      this.availableCounterReports = counterReports;
      console.log(this.availableCounterReports);
      this.filterCounterReportsByStoreIdAndDate();
    });
  }





  getPaymentAmountByPaymentType(counterReport: any, paymentType: number): number {
    const payment = counterReport.counterReportPayments.find((p: any) => p.paymentType === paymentType);
    return payment?.countedSum || 0;
  }


  filterCounterReportsByStoreIdAndDate() {

    this.filteredCounterReports = this.availableCounterReports.filter(counterReport => {
      const saleDate = new Date(counterReport.closeDateTime);
      const chosenDate = new Date(this.chosenDate);

      console.log(saleDate);
      console.log(chosenDate);




      return (
        counterReport.counter.storeId === this.currentStore.currentStore?.id &&
        saleDate.getMonth() === chosenDate.getMonth() &&
        saleDate.getDate() === chosenDate.getDate()

      );

    });


    console.log(this.filteredCounterReports);

  }


  ngOnInit(): void {
    this.updateAvailableCounterReports();




  }

}
