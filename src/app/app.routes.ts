import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {StorePageComponent} from './pages/store-page/store-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {SupplierPageComponent} from './pages/supplier-page/supplier-page.component';

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





];
