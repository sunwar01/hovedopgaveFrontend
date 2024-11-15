import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {FloatLabelModule} from 'primeng/floatlabel';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {Select} from 'primeng/select';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {ProductModel} from '../../core/models/productRelated/product.model';
import {ProductService} from '../../core/services/api/product.service';
import {SelectButton} from 'primeng/selectbutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {StockChangeType} from '../../core/enums/stockChangeType.enum';
import {RadioButtonModule} from 'primeng/radiobutton';
import {StockProductsService} from '../../core/services/api/stockProducts.service';
import {ManufacturerPostDto} from '../../core/models/manufacturerRelated/dto/manufacturerPost.dto';
import {StockProductsUpdateDto} from '../../core/models/stockProductsRelated/dto/stockProductsUpdate.dto';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {StockProductsModel} from '../../core/models/stockProductsRelated/stockProducts.model';
import {first} from 'rxjs';
import {ToastService} from '../../core/services/toastService/toast.service';



@Component({
  selector: 'app-stock-management-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    FloatLabelModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    Ripple,
    Select,
    SharedModule,
    TableModule,
    ToastModule,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    SelectButton,
    FormsModule,
    ProgressSpinnerModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
    RadioButtonModule
  ],
  templateUrl: './stock-management-page.component.html',
  styleUrl: './stock-management-page.component.css'
})
export class StockManagementPageComponent implements OnInit
{

  selectedState: StockChangeType = StockChangeType.StockAdded;

  stateOptions: any[] = [
    { label: 'Læg på lager', value: StockChangeType.StockAdded },
    { label: 'Fjern fra lager', value: StockChangeType.StockRemoved },
    { label: 'Optælling', value: StockChangeType.StockAdjusted },
  ];



  inputMaengde: number | null = null ;

  availableStockProducts: StockProductsModel[] = [];

  // ! = non-null assertion operator
  selectedStockProduct: StockProductsModel = null!;

  isLoading: boolean = false;




  constructor(private toastService: ToastService,
              private currentStoreService: CurrentStoreService, private stockProductsService: StockProductsService, private currentUserService: CurrentUserService) {



  }







  ngOnInit(): void
  {

    this.updateStockProductList();



  }



  clearInput() {
    this.inputMaengde = null;
    this.selectedStockProduct = null!;
  }


  updateStockProductList() {

    this.isLoading = true;
    if (this.currentStoreService.currentStore?.id != null){
      this.stockProductsService.GetStockProductsByStockId(this.currentStoreService.currentStore.stock.id).subscribe((data: StockProductsModel[]) => {
        this.availableStockProducts = data;
        this.isLoading = false;
      });
    }
  }



  updateStock() {

    if (this.selectedStockProduct && this.inputMaengde !== null) {
      this.currentUserService.currentUser$
        .pipe(first(currentUser => currentUser !== null))
        .subscribe(currentUser => {
          let stockProductsUpdateDto: StockProductsUpdateDto = {
            id : this.selectedStockProduct.id,
            quantity: this.inputMaengde || 0,
            userId: currentUser.id,
            ChangeType: this.selectedState
          };

          this.stockProductsService.UpdateStockProduct(stockProductsUpdateDto).subscribe({
            error: (error: any) => {
              this.toastService.showError(error);
              console.log(error);
            },
            complete: () => {
              this.toastService.showSuccess("Stock updated successfully");
              this.clearInput();
              this.updateStockProductList();
            }
          });
        });




    }
  }




}
