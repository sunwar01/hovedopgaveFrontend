import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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





}
