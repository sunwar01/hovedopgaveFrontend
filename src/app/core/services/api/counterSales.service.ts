import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})


export class CounterSalesService
{
  private baseUrl = 'http://localhost:5257/API/CounterSales/';

  constructor(private http: HttpClient)
  {
  }

  GetCounterSaless(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetCounterSaless`);

  }

  GetCounterSales(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetCounterSales/${id}`);
  }

  CreateCounterSales(counterSales: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateCounterSales`, counterSales);
  }

  UpdateCounterSales(counterSales: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateCounterSales/${counterSales.id}`, counterSales);
  }

  DeleteCounterSales(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteCounterSales/${id}`);
  }

  SoftDeleteCounterSales(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteCounterSales/${id}`, { responseType: 'text' });
  }

  RestoreCounterSales(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreCounterSales/${id}`, null);
  }




}
