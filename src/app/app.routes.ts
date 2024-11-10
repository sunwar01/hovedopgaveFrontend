import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {StorePageComponent} from './pages/store-page/store-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {SupplierPageComponent} from './pages/supplier-page/supplier-page.component';
import {CategoryPageComponent} from './pages/category-page/category-page.component';
import {ManufacturerPageComponent} from './pages/manufacturer-page/manufacturer-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';

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





];
