import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable
({
  providedIn: 'root'
})


export class StockProductsService
{
  private baseUrl = 'http://localhost:5257/API/StockProducts/';

  constructor(private http: HttpClient)
  {
  }

  GetStockProducts(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetStockProducts`);

  }

  GetStockProductsByStockId(stockId: number): Observable<any>
  {
    console.log("Fetching stock products for stock ID:", stockId);
    return this.http.get(`${this.baseUrl}GetStockProductsByStockId/${stockId}`);
  }

  GetStockProduct(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}GetStockProducts/${id}`);
  }

  CreateStockProduct(stockProduct: any): Observable<any> {
    return this.http.post(`${this.baseUrl}CreateStockProducts`, stockProduct);
  }

  UpdateStockProduct(stockProduct: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateStockProducts/${stockProduct.id}`, stockProduct);
  }

  DeleteStockProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteStockProducts/${id}`);
  }

  SoftDeleteStockProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}SoftDeleteStockProducts/${id}`, { responseType: 'text' });
  }

  RestoreStockProduct(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}RestoreStockProducts/${id}`, null);
  }




}
