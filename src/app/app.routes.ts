import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {StorePageComponent} from './pages/store-page/store-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'select-store', component: StorePageComponent},
  { path: 'main', component: MainPageComponent},

];
