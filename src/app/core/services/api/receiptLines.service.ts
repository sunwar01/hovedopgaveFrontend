import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
({
  providedIn: 'root'
})


export class ReceiptLinesService
{
  private baseUrl = 'http://localhost:5257/API/ReceiptLines/';

  constructor(private http: HttpClient)
  {
  }

  GetReceiptLines(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetReceiptLiness`);

  }

  GetReceiptLine(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetReceiptLines/${id}`);
  }

  CreateReceiptLines(receiptLines: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateReceiptLines`, receiptLines);
  }

  UpdateReceiptLines(receiptLines: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateReceiptLines/${receiptLines.id}`, receiptLines);
  }

  DeleteReceiptLines(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteReceiptLines/${id}`);
  }

  SoftDeleteReceiptLines(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteReceiptLines/${id}`, { responseType: 'text' });
  }

  RestoreReceiptLines(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreReceiptLines/${id}`, null);
  }




}
