import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DatePipe} from "@angular/common";
import {SharedModule} from "primeng/api";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {DividerModule} from 'primeng/divider';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CounterReportService} from '../../core/services/api/counterReport.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentCounterService} from '../../core/services/currentCounterService/currentCounter.service';
import {CounterSalesService} from '../../core/services/api/counterSales.service';
import {ButtonModule} from 'primeng/button';
import {CounterService} from '../../core/services/api/counter.service';
import {CounterReportUpdateDto} from '../../core/models/counterReportRelated/dto/counterReportUpdate.dto';
import {CounterUpdateDto} from '../../core/models/counterRelated/dto/counterUpdate.dto';
import {CounterReportPaymentsService} from '../../core/services/api/counterReportPayments.service';
import {
  CounterReportPaymentsPostDto
} from '../../core/models/counterReportPaymentsRelated/dto/counterReportPaymentsPost.dto';

@Component({
  selector: 'app-close-counter-page',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    SharedModule,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    TableModule,
    Tabs,
    ToastModule,
    DividerModule,
    FloatLabelModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './close-counter-page.component.html',
  styleUrl: './close-counter-page.component.css'
})



export class CloseCounterPageComponent implements OnInit {

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

  // balance input fields cash
  totalCashCounted: number = 0;
  RegisteredCash: number = 0;
  DifferenceCash : number = 0;

  // balance input fields card
  totalCardCounted: number = 0;
  RegisteredCard: number = 0;
  DifferenceCard : number = 0;

  // balance input fields mobilePay
  totalMobilePayCounted: number = 0;
  RegisteredMobilePay: number = 0;
  DifferenceMobilePay : number = 0;

  // balance input fields invoice
  totalInvoiceCounted: number = 0;
  RegisteredInvoice: number = 0;
  DifferenceInvoice : number = 0;

  totalPaymentCounted : number = 0;
  totalDifference : number = 0;
  newHolding : number = 0;



  constructor(private route : ActivatedRoute,
              private counterReportService : CounterReportService,
              private currentCounterService: CurrentCounterService,
              private counterSales : CounterSalesService,
              private counterService : CounterService,
              private counterReportPaymentsService : CounterReportPaymentsService) {
  }



  ngOnInit(): void {
    this.getRegisteredSales();
  }

  getRegisteredSales() {
    this.route.params.subscribe(params => {
      if (params['counterId'] == null) {
        console.log("No counter id");
        return;
      }

      this.counterSales.GetCounterSalesByCounterId(params['counterId']).subscribe((data) => {
        if (data != null) {

          data
            .filter((sale: any) => sale.paymentType === 0)  // 0 = cash
            .forEach((sale: any) => {
              this.RegisteredCash += sale.amount;
            });


          data
            .filter((sale: any) => sale.paymentType === 1) // 1 = card
            .forEach((sale: any) => {
              this.RegisteredCard += sale.amount;
            });

          data
            .filter((sale: any) => sale.paymentType === 2) // 2 = invoice
            .forEach((sale: any) => {
              this.RegisteredInvoice += sale.amount;
            });

          data
            .filter((sale: any) => sale.paymentType === 3) // 3 = mobilePay
            .forEach((sale: any) => {
              this.RegisteredMobilePay += sale.amount;
            });

          this.calculateDifference();

        }
      });
    });
  }




  calculateDifference() {
    this.DifferenceCash = this.totalCashCounted - this.RegisteredCash;

    this.DifferenceCard = this.totalCardCounted - this.RegisteredCard;

    this.DifferenceInvoice = this.totalInvoiceCounted - this.RegisteredInvoice;

    this.DifferenceMobilePay = this.totalMobilePayCounted - this.RegisteredMobilePay;

    this.newHolding = this.totalCashCounted;


    this.totalPaymentCounted =
      Number(this.totalCashCounted) +
      Number(this.totalCardCounted) +
      Number(this.totalInvoiceCounted) +
      Number(this.totalMobilePayCounted);


    this.totalDifference = this.totalPaymentCounted - (this.RegisteredCash + this.RegisteredCard + this.RegisteredInvoice + this.RegisteredMobilePay);

  }


  calculateTotalCounted() {
    this.totalCashCounted = this.cash1000 * 1000 + this.cash500 * 500 + this.cash200 * 200 + this.cash100 * 100 +
      this.cash50 * 50 + this.cash20 * 20 + this.cash10 * 10 + this.cash5 * 5 + this.cash2 * 2 +
      this.cash1 * 1 + this.cash05 * 0.5;

    this.calculateDifference();
  }



  closeCounter() {




    this.route.params.subscribe(params => {
      if (params['counterId'] == null) {
        console.log("No counter id");
        return;
      }



      const counterReportUpdate: CounterReportUpdateDto = {
        newHolding: this.newHolding,
        difference: this.totalDifference
      };


      this.counterReportService.GetLatestCounterReportById(params['counterId']).subscribe((data) => {
        if (data != null) {

          this.counterReportService.updateCounterReport(data, counterReportUpdate).subscribe({

            next: (data: any) => {
              console.log(data);
            },
            error: (error: any) => {
              console.log(error);
            },
            complete: () => {

            }
          });

          const paymentTypes = [
            {
              paymentType: 0,
              countedSum: this.totalCashCounted,
              registeredSum: this.RegisteredCash,
              Difference: this.DifferenceCash
            },
            {
              paymentType: 1,
              countedSum: this.totalCardCounted,
              registeredSum: this.RegisteredCard,
              Difference: this.DifferenceCard
            },
            {
              paymentType: 2,
              countedSum: this.totalInvoiceCounted,
              registeredSum: this.RegisteredInvoice,
              Difference: this.DifferenceInvoice
            },
            {
              paymentType: 3,
              countedSum: this.totalMobilePayCounted,
              registeredSum: this.RegisteredMobilePay,
              Difference: this.DifferenceMobilePay
            }
          ];



          paymentTypes.forEach(payment => {
            const counterReportPayment: CounterReportPaymentsPostDto = {
              counterReportId: data.id,
              paymentType: payment.paymentType,
              countedSum: payment.countedSum,
              registeredSum: payment.registeredSum,
              Difference: payment.Difference
            };

            this.counterReportPaymentsService.CreateCounterReportPayment(counterReportPayment).subscribe({
              error: (error: any) => {
                console.log(error);
              },
              complete: () => {
                console.log(`Payment type ${payment.paymentType} processed successfully.`);
              }
            });
          });


          const counterUpdate: CounterUpdateDto = {
            status: false
          }

          this.counterService.UpdateCounter({id: params['counterId'],  counterUpdate}).subscribe({
            error: (error: any) => {
              console.log(error);
            },
            complete: () => {

            }
          });



        }
      });




    })


    this.currentCounterService.clearCurrentCounter();

  }

}
