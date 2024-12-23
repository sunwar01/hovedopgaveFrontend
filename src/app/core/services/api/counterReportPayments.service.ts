import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})

export class CounterReportPaymentsService
{
  private baseUrl = 'http://localhost:5257/API/CounterReportPayments/';



  constructor(private http: HttpClient)
  {
  }

  CreateCounterReportPayment(counterReportPayment: any): Observable<any>
  {
    return this.http.post(`${this.baseUrl}CreateCounterReportPayment`, counterReportPayment);
  }











}
