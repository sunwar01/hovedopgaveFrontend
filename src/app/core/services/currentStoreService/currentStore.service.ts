import {Injectable} from '@angular/core';
import {CookiesService} from '../cookiesService/cookies.service';
import {StoreModel} from '../../models/storeRelated/store.model';
import {StoreGetDto} from '../../models/storeRelated/dto/storeGet.dto';

@Injectable({
  providedIn: 'root'
})

export class CurrentStoreService
{

  constructor(private cookiesService: CookiesService)
  {

    this.getCurrentStore();
  }

  public currentStore: StoreGetDto | null = null;


  public getCurrentStore(): StoreGetDto | null
  {
    if (!this.currentStore)
    {
      const store = this.cookiesService.getCookie('currentStore');
      if (store)
      {
        this.currentStore = JSON.parse(store);
      }
    }
    return this.currentStore;
  }


  public setCurrentStore(store: any, days: number): void
  {
    this.currentStore = store;
    this.cookiesService.setCookie('currentStore', JSON.stringify(store), days);
  }

  public clearCurrentStore(): void
  {
    this.currentStore = null;
    this.cookiesService.deleteCookie('currentStore');
  }


}


