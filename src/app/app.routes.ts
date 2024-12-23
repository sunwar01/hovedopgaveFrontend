import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {StorePageComponent} from './pages/store-page/store-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {SupplierPageComponent} from './pages/supplier-page/supplier-page.component';
import {CategoryPageComponent} from './pages/category-page/category-page.component';
import {ManufacturerPageComponent} from './pages/manufacturer-page/manufacturer-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {StockManagementPageComponent} from './pages/stock-management-page/stock-management-page.component';
import {CounterPageComponent} from './pages/counter-page/counter-page.component';
import {CreateCasePageComponent} from './pages/create-case-page/create-case-page.component';
import {FindCasePageComponent} from './pages/find-case-page/find-case-page.component';
import {DisplayCasePageComponent} from './pages/display-case-page/display-case-page.component';
import {ShowLatestCasesPageComponent} from './pages/show-latest-cases-page/show-latest-cases-page.component';
import {UnsolvedCasesPageComponent} from './pages/unsolved-cases-page/unsolved-cases-page.component';
import {ShowLatestReceiptsPageComponent} from './pages/show-latest-receipts-page/show-latest-receipts-page.component';
import {FindReceiptPageComponent} from './pages/find-receipt-page/find-receipt-page.component';
import {DisplayReceiptPageComponent} from './pages/display-receipt-page/display-receipt-page.component';
import {SelectCounterPageComponent} from './pages/select-counter-page/select-counter-page.component';
import {OpenCounterPageComponent} from './pages/open-counter-page/open-counter-page.component';
import {CloseCounterPageComponent} from './pages/close-counter-page/close-counter-page.component';

export const routes: Routes = [


  /*******************************************
   *           Core Related                  *
   * *****************************************/

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'select-store', component: StorePageComponent},
  { path: 'main', component: MainPageComponent},


   /*******************************************
   *           Product Related               *
   * *****************************************/

  { path: 'supplier', component: SupplierPageComponent},
  { path: 'category', component: CategoryPageComponent},
  { path: 'manufacturer', component: ManufacturerPageComponent},
  { path: 'products', component: ProductPageComponent},


  /*******************************************
   *           Stock Related                 *
   * *****************************************/
  { path: 'stock-management', component: StockManagementPageComponent},

  /*******************************************
   *           Counter Related               *
   * *****************************************/
  { path: 'counter', component: CounterPageComponent},
  { path: 'counter-selection/:type', component: SelectCounterPageComponent}, //  select, open or close
  { path: 'open-counter/:counterId', component: OpenCounterPageComponent},
  { path: 'close-counter/:counterId', component: CloseCounterPageComponent},


  /*******************************************
   *           Case Related                  *
   * *****************************************/

  { path: 'create-case', component: CreateCasePageComponent},
  { path: 'find-case', component: FindCasePageComponent},
  { path: 'display-case/:caseId', component: DisplayCasePageComponent},
  { path: 'latest-cases', component: ShowLatestCasesPageComponent},
  { path: 'unsolved-cases', component: UnsolvedCasesPageComponent},



  /*******************************************
   *           Receipt Related               *
   * *****************************************/

  { path: 'latest-receipts', component: ShowLatestReceiptsPageComponent},
  { path: 'find-receipt', component: FindReceiptPageComponent},
  { path: 'display-receipt/:receiptId', component: DisplayReceiptPageComponent},








];
