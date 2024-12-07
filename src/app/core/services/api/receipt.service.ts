import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})


export class ReceiptService
{
  private baseUrl = 'http://localhost:5257/API/Receipt/';

  constructor(private http: HttpClient)
  {
  }

  GetReceipts(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetReceipts`);

  }

  GetReceipt(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetReceipt/${id}`);
  }

  CreateReceipt(receipt: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateReceipt`, receipt);
  }

  UpdateReceipt(receipt: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateReceipt/${receipt.id}`, receipt);
  }

  DeleteReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteReceipt/${id}`);
  }

  SoftDeleteReceipt(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteReceipt/${id}`, { responseType: 'text' });
  }

  RestoreReceipt(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreReceipt/${id}`, null);
  }




}
