import {Injectable} from '@angular/core';
import {CookiesService} from '../cookiesService/cookies.service';
import {CounterGetDto} from '../../models/counterRelated/dto/counterGet.dto';



@Injectable({
  providedIn: 'root'
})

export class CurrentCounterService
{

  constructor(private cookiesService: CookiesService)
  {

    this.getCurrentCounter();
  }

  public currentCounter: CounterGetDto | null = null;


  public getCurrentCounter(): CounterGetDto | null
  {
    return this.currentCounter;
  }


  public setCurrentCounter(counter: any): void
  {
    this.currentCounter = counter;

  }

  public clearCurrentCounter(): void
  {
    this.currentCounter = null;

  }


}


