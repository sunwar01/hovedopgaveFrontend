import {Injectable} from '@angular/core';
import {ICookiesService} from './iCookies.service';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class CookiesService implements  ICookiesService
{
  constructor(private cookieService: CookieService)
  {
  }


  setCookie(key: string, value: string, days: number): void
  {
    this.cookieService.set(key, value, days, '/');
  }
  getCookie(key: string): string
  {
    return this.cookieService.get(key);
  }
  deleteCookie(key: string): void
  {
    this.cookieService.delete(key, '/');
  }

}
