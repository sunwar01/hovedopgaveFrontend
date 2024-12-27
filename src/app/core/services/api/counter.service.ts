import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomerUpdateDto} from '../../models/customerRelated/dto/customerUpdate.dto';
import {CounterUpdateDto} from '../../models/counterRelated/dto/counterUpdate.dto';

@Injectable
({
  providedIn: 'root'
})

export class CounterService
{
  private baseUrl = 'http://localhost:5257/API/Counter/';



  constructor(private http: HttpClient)
  {
  }

  GetCounters(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetCounters`);
  }

  GetCounterById(counterId: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetCounter/${counterId}`);
  }



  UpdateCounter(counterId: number, counterUpdateDto: CounterUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateCounter/${counterId}`, counterUpdateDto);
  }






}
