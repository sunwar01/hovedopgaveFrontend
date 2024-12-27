import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {NgForOf, NgIf, NgSwitchCase} from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SharedModule} from 'primeng/api';
import {Tab, TabList, Tabs} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {StockProductsModel} from '../../core/models/stockProductsRelated/stockProducts.model';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {StockProductsService} from '../../core/services/api/stockProducts.service';
import {ListboxModule} from 'primeng/listbox';
import {DividerModule} from 'primeng/divider';
import {StockChangeType} from '../../core/enums/stockChangeType.enum';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PaymentType} from '../../core/enums/paymentType.enum';
import {ReceiptPostDto} from '../../core/models/receiptRelated/dto/receiptPost.dto';
import {ReceiptService} from '../../core/services/api/receipt.service';
import {ToastService} from '../../core/services/toastService/toast.service';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {ReceiptLinesPostDto} from '../../core/models/receiptLinesRelated/dto/receiptLinesPost.dto';
import {ReceiptLinesService} from '../../core/services/api/receiptLines.service';
import {CounterSalesService} from '../../core/services/api/counterSales.service';
import {CounterSalesPostDto} from '../../core/models/counterSalesRelated/dto/counterSalesPost.dto';
import {CurrentCounterService} from '../../core/services/currentCounterService/currentCounter.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgForOf,
    NgIf,
    NgSwitchCase,
    ProgressSpinnerModule,
    SharedModule,
    Tab,
    TabList,
    TableModule,
    Tabs,
    ToastModule,
    ListboxModule,
    DividerModule,
    FloatLabelModule
  ],
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent implements OnInit{

  availableStockProducts: StockProductsModel[] = [];

  balance: number = 0;
  betaling: number = 0;


  selectedStockProduct: StockProductsModel | null = null;


  selectedStockProducts: {stockProductId: number; product: any; quantity: number; type: string }[] = [];

  payments: { paymentType: PaymentType; amount: number }[] = [];


  selectedSaleType: StockChangeType = StockChangeType.StockRemoved;

  selectedPaymentType: PaymentType = PaymentType.Card;

  caseId: string | null = null;




  constructor(private currentStoreService: CurrentStoreService,
              private stockProductsService: StockProductsService, private receiptService : ReceiptService,
              private toastService : ToastService, private currentUserService : CurrentUserService,
              private receiptLinesService : ReceiptLinesService, private counterSalesService : CounterSalesService,
              private currentCounterService : CurrentCounterService,
              private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void
  {

    console.log(this.currentCounterService.currentCounter);
    console.log(this.currentCounterService.currentCounter?.status);



    if (this.currentCounterService.currentCounter == null || this.currentCounterService.currentCounter?.status == false) {

      this.router.navigate(['/counter-selection' + '/select']);
    }

    this.updateStockProductList();
    //this.getProductsFromCase();

  }


  /* private getStockProductId(productId: number, stockId: number): number {

      this.stockProductsService.GetStockProductsByStockId(stockId).subscribe((data: StockProductsModel[]) => {


         let stockProduct = data.find(p => p.productId === productId);

         if (stockProduct) {
           console.log(stockProduct.id);
           return stockProduct.id;

         }

         return 0;


      });

     return 0;
   }

   private transformToSelectedStockProducts(caseProducts: any[]): void {

     const currentStockId = this.currentStoreService.currentStore?.stock.id || 0;



     this.selectedStockProducts = caseProducts.map(caseProduct => {

       console.log(caseProduct.product.price);

       return {
         stockProductId: this.getStockProductId(caseProduct.productId, currentStockId),
         product: caseProduct.product,
         quantity: caseProduct.quantity,
         type: 'sale'
       };
     });
   }


   getProductsFromCase() {

     this.route.queryParams.subscribe(params => {
       this.caseId = params['caseId'];

       const caseProducts = params['caseProducts'] ? JSON.parse(params['caseProducts']) : [];

       this.transformToSelectedStockProducts(caseProducts);
     });

   }*/

  getEnumName(value: number): string {
    return PaymentType[value];
  }

  selectPaymentType(action: PaymentType) {
    this.selectedPaymentType = action;

    this.addPayment();


  }

  selectSaleType(action: StockChangeType) {
    this.selectedSaleType = action;


  }


  addPayment() {


    this.payments.push({
      paymentType: this.selectedPaymentType,
      amount: this.betaling,
    });



    this.processPayment(this.betaling);




    this.updateBalanceAndBetaling();



  }





  processPayment(amount: number): void {



    if (amount <= 0) {
      console.error('Invalid payment amount: Must be greater than zero.');
      return;
    }


    this.balance += amount;
    this.betaling -= amount;


  }







  addToSelectedStockProducts(event: any) {
    const selected = event.value;

    if (selected) {
      const existingProduct = this.selectedStockProducts.find(
        (p) =>
          p.product.supplierProductId === selected.product.supplierProductId &&
          p.type === (this.selectedSaleType === StockChangeType.StockRemoved ? 'Salg' : 'Retur')
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {




        this.selectedStockProducts.push({
          stockProductId: this.selectedStockProduct?.id || 0,
          product: selected.product,
          quantity: 1,
          type: this.selectedSaleType === StockChangeType.StockRemoved ? 'Salg' : 'Retur',
        });
      }
    }
    this.updateBalanceAndBetaling();
  }

  calculateTotalPrice(): number {
    return this.selectedStockProducts.reduce((sum, p) => {
      const priceAdjustment = p.product.price * p.quantity;
      return sum + (p.type === 'Salg' ? priceAdjustment : -priceAdjustment);
    }, 0);
  }

  updateStock() {

    this.selectedStockProducts.forEach((p) => {
      const stockProductsUpdateDto = {
        id: p.stockProductId,
        quantity: p.type === 'Salg' ? p.quantity : -p.quantity,
        userId: this.currentUserService.getCurrentUserId(),
        ChangeType: StockChangeType.StockRemoved,
      };



      this.stockProductsService.UpdateStockProduct(stockProductsUpdateDto).subscribe({
        error: (error: any) => {
          this.toastService.showError(error);
          console.log(error);
        },
        complete: () => {
          this.updateStockProductList();
        }
      });



  });
  }


  createCounterSales(receiptId : number | null) {

    this.payments.forEach((p) => {
      const counterSales: CounterSalesPostDto = {
        receiptId: receiptId,
        paymentType: p.paymentType,
        amount: p.amount,
        storeId: this.currentStoreService.currentStore?.id,
        counterId: this.currentCounterService.currentCounter?.id,
      };



      this.counterSalesService.CreateCounterSales(counterSales).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          this.toastService.showError(error);
          console.log(error);
        },
        complete: () => {

        }
      });
    });

  }

  createReceiptLines(receiptId : number | null)
  {
    this.selectedStockProducts.forEach((p) => {
      const receiptLine: ReceiptLinesPostDto = {
        receiptId : receiptId,
        productId : p.product.id,
        productText : p.product.name,
        quantity : p.quantity,
        price: p.type === 'Retur' ? -p.product.price * p.quantity : p.product.price * p.quantity

      };

      console.log(receiptLine);

      this.receiptLinesService.CreateReceiptLines(receiptLine).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          this.toastService.showError(error);
          console.log(error);
        },
        complete: () => {

        }
      });
    });

  }

  createNewReceipt()
  {


     let receiptId : number  | null  = null;


    const receipt: ReceiptPostDto = {
      total : this.calculateTotalPrice(),
      storeId : this.currentStoreService.currentStore?.id,
      counterId : this.currentCounterService.currentCounter?.id,
      userId : this.currentUserService.getCurrentUserId(),
      caseId : null, // case id er null, da vi her laver et salg direkte i kassen
    };

    this.receiptService.CreateReceipt(receipt).subscribe({
      next: (data: any) => {
        receiptId = data.id;



      },
      error: (error: any) => {
        this.toastService.showError(error);
        console.log(error);
      },
      complete: () => {
        this.createReceiptLines(receiptId);
        this.createCounterSales(receiptId);
        this.updateStock();
        this.clearCounter();

        this.toastService.showSuccess("Salg gennemført");

      }
    });

  }


  clearCounter() {
    this.selectedStockProducts = [];
    this.payments = [];
    this.updateBalanceAndBetaling();
  }


  removeFromSelectedStockProducts(product: { stockProductId: number; product: any; quantity: number; type: string }) {
    const index = this.selectedStockProducts.indexOf(product);
    if (index >= 0) {
      this.selectedStockProducts.splice(index, 1);
    }
    this.updateBalanceAndBetaling();
  }

  removePayment(payment: { paymentType: PaymentType; amount: number }) {
    const index = this.payments.indexOf(payment);
    if (index >= 0) {
      this.payments.splice(index, 1);
    }
    this.updateBalanceAndBetaling();
  }



  updateBalanceAndBetaling() {
    let totalSales = 0;
    let totalReturns = 0;


    this.selectedStockProducts.forEach((p) => {
      const priceAdjustment = p.product.price * p.quantity;
      if (p.type === 'Salg') {
        totalSales += priceAdjustment;
      } else if (p.type === 'Retur') {
        totalReturns += priceAdjustment;
      }
    });

    const productBetaling = totalSales - totalReturns;

    const totalPayments = this.payments.reduce((sum, payment) => sum + payment.amount, 0);


    this.betaling = productBetaling - totalPayments;
    this.balance = -this.betaling;


  }












  onQuantityChange(stockProduct: StockProductsModel) {
    if (stockProduct.quantity < 1) {
      stockProduct.quantity = 1;
    }
      this.updateBalanceAndBetaling();
  }


  updateStockProductList() {


    if (this.currentStoreService.currentStore?.id != null){
      this.stockProductsService.GetStockProductsByStockId(this.currentStoreService.currentStore.stock.id).subscribe((data: StockProductsModel[]) => {
        this.availableStockProducts = data;
      });
    }
  }


  protected readonly PaymentType = PaymentType;
}
